import React from "react";
import registerCollection from "../utils/registerCollection";
import { Hello } from "./Hello";
import { Info } from "./Info";

registerCollection("LinksCollection");

export const App: React.FC = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <Hello />
    <Info />
  </div>
);
