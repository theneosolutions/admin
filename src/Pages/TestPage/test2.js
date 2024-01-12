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
  return reactNativeCode
    .replace(/<View>/g, "<div>")
    .replace(/<\/View>/g, "</div>")
    .replace(/<Text>/g, "<p>")
    .replace(/<\/Text>/g, "</p>")
    .replace(/<a>/g, "<span>")
    .replace(/<\/a>/g, "</span>");
}

const reactNativeCode = `
  <View>
    <Text>
      Edit App.js to change this screen and turn it
      into your app.
    </Text>
    <Text>
      Press Cmd + R inside the simulator to reload
      your app’s code.
    </Text>
    <Text>
      Press Cmd + M or Shake your device to open the
      React Native Debug Menu.
    </Text>
    <Text>
      Read the docs to discover what to do next:
    </Text>
  </View>
  `;
