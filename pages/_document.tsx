import Document, { Html, Main } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <body>
          <Main />
          <div id="modal" />
        </body>
      </Html>
    );
  }
}
