function limitText(text, count){
  return text && text.slice(0, count) + (text.length > count ? "..." : "");
};


export {
  limitText,
}