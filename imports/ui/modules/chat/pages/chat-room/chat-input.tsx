import React from "react"
import { Button } from "react-bootstrap"

const ChatInput: React.FC = () => {
  return (
    <div className="p-3 border-top bg-white">
      <form>
        <div className="d-flex gap-2">
          <input type="text" className="form-control" placeholder="Type a message..." />
          <Button variant="primary" disabled>Send</Button>
        </div>
      </form>
      <small className="text-muted mt-2 d-block">This is a preview of the chat room functionality.</small>
    </div>
  )
}

export default ChatInput