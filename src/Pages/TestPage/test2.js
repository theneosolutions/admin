import React from "react";

function TestPage() {
  const reactWebCode = convertReactNativeToReactWeb(reactNativeCode);

  console.log(reactWebCode);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-48 h-96 bg-white border-4 border-black rounded-3xl overflow-hidden">
        <div className="w-full h-6 bg-gray-800 rounded-t-3xl"></div>
        <div className="w-full h-80 bg-gray-300">
          <div dangerouslySetInnerHTML={{ __html: reactWebCode }} />
        </div>
      </div>
    </div>
  );
}

export default TestPage;
function convertReactNativeToReactWeb(reactNativeCode) {
  const tagMappings = {
    View: "div",
    Text: "p",
    TextInput: "input",
    Button: "button",
    // Add more mappings as needed
  };

  const regexOpenTag = new RegExp(
    `<(${Object.keys(tagMappings).join("|")})>`,
    "g"
  );
  const regexCloseTag = new RegExp(
    `<\/(${Object.keys(tagMappings).join("|")})>`,
    "g"
  );

  const updatedCode = reactNativeCode
    .replace(regexOpenTag, (match, p1) => `<${tagMappings[p1]}>`)
    .replace(regexCloseTag, (match, p1) => `</${tagMappings[p1]}>`);

  // Replace onPress with onClick for buttons
  return updatedCode.replace(/onPress=/g, "onClick=");
}

const reactNativeCode = `
<View>
  <Text>
    Edit App.js to change this screen and turn it
    into your app.
  </Text>
  <TextInput placeholder="Type here..." />
  <Button title="Press me" onPress={() => console.log('Button pressed')} />
</View>
`;
