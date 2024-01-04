function getPostId() {
  const linkedinURL= document.querySelector("#url").value;
  const regex = /([0-9]{19})/;
  const postId = regex.exec(linkedinURL).pop();
  return postId;
}

function extractUnixTimestamp(postId) {
  // BigInt needed as we need to treat postId as 64 bit decimal. This reduces browser support.
  const asBinary = BigInt(postId).toString(2);
  const first41Chars = asBinary.slice(0, 41);
  const timestamp = parseInt(first41Chars, 2);
  return timestamp;
}

function unixTimestampToHumanDate(timestamp) {
  const dateObject = new Date(timestamp);
  dateObject.setUTCHours(dateObject.getUTCHours() + 5);
  dateObject.setUTCMinutes(dateObject.getUTCMinutes() + 30);
  // Extract individual components for 12-hour format
  const hours12 = dateObject.getHours() % 12 || 12; // Convert 0 to 12
  const minutes = dateObject.getMinutes();
  const ampm = dateObject.getHours() >= 12 ? 'PM' : 'AM';
  
  // Format the date to a human-readable string in 12-hour format
  const humanDateFormat = `${dateObject.toDateString()} ${hours12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm} (Indian1 Standard Time)`;
  
  return humanDateFormat;
}

function getDate() {
  const postId = getPostId();
  const unixTimestamp = extractUnixTimestamp(postId);
  const humanDateFormat = unixTimestampToHumanDate(unixTimestamp);
  document.querySelector("#date").textContent = humanDateFormat;
}
