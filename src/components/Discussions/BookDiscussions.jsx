import { useState, useEffect } from "react";
import { createConsumer } from "@rails/actioncable";

function BookDiscussions({ bookId, user }) {
  console.log("BookId received:", bookId); // Debug log
  const [discussions, setDiscussions] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    console.log("BookId for fetch:", bookId);
    // Load existing discussions
    fetch(`/books/${bookId}/discussions`)
      .then((r) => r.json())
      .then((data) => {
        console.log("Raw discussions data:", data); // Let's see the exact structure

        // Handle both array and object responses
        const discussionsArray = Array.isArray(data)
          ? data
          : data.discussions || [];

        const sortedDiscussions = discussionsArray.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        console.log("Sorted discussions:", sortedDiscussions);
        setDiscussions(sortedDiscussions);
      })
      .catch((error) => {
        console.error("Error fetching discussions:", error);
        setDiscussions([]);
      });

    // Setup WebSocket connection
    const consumer = createConsumer("ws://localhost:3000/cable");

    const channel = consumer.subscriptions.create(
      {
        channel: "DiscussionsChannel",
        book_id: bookId,
      },
      {
        connected() {
          console.log("WebSocket connected!"); // Debug log
        },
        disconnected() {
          console.log("WebSocket disconnected!"); // Debug log
        },
        received: (data) => {
          console.log("Received WebSocket data:", data);
          setDiscussions((prev) =>
            [data, ...(Array.isArray(prev) ? prev : [])]
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .slice(0, 3)
          );
        },
      }
    );

    setChannel(channel);

    return () => {
      channel.unsubscribe();
    };
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");

    if (!newMessage.trim()) {
      console.log("Message is empty");
      return;
    }

    if (!user) {
      console.log("No user logged in");
      alert("Please log in to post a comment");
      return;
    }

    const discussionData = {
      content: newMessage,
      book_id: bookId,
      user_id: user.id,
    };

    console.log("Sending discussion:", discussionData);

    try {
      const response = await fetch(`/books/${bookId}/discussions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discussionData),
      });

      if (response.ok) {
        const returnedData = await response.json();
        console.log("Discussion created:", returnedData);
        setDiscussions((prev) =>
          [returnedData, ...prev]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 3)
        );
        setNewMessage("");
      } else {
        console.error("Failed to create discussion:", await response.json());
      }
    } catch (error) {
      console.error("Error creating discussion:", error);
    }
  };

  // Add a guard clause for rendering
  if (!Array.isArray(discussions)) {
    console.log("Discussions is not an array:", discussions); // Debug log
    return <div>Loading discussions...</div>;
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Discussion</h3>

      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          placeholder="Add to the discussion..."
          rows="3"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 text-white rounded transition-colors z-50 hover:cursor-pointer"
            disabled={!newMessage.trim()}
            style={{ backgroundColor: "#8D27AE" }}
          >
            Post Comment
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {console.log("Rendering discussions:", discussions)} {/* Debug log */}
        {discussions.slice(0, 3).map((discussion) => (
          <div key={discussion.id} className="p-3 border rounded">
            <div className="font-bold">{discussion.username}</div>
            <div>{discussion.content}</div>
            <div className="text-sm text-gray-500">
              {new Date(discussion.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookDiscussions;
