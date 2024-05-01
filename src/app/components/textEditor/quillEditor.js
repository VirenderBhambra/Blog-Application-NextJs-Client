// components/textEditor/QuillEditor.js
import dynamic from "next/dynamic";

const DynamicQuillEditor = dynamic(() => import("./quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const QuillEditor = (props) => {
  return <DynamicQuillEditor {...props} />;
};

export default QuillEditor;
