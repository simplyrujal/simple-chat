import { Button } from "flowbite-react";
import React from "react";

const SubmitButton: React.FC = () => {
  return (
    <Button color="primary" type="submit" className="w-1/5" size="md">
      Send
    </Button>
  );
};

export default SubmitButton;
