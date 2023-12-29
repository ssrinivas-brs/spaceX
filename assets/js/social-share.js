// Get the social sharing icons
const facebookIcon = document.getElementById("facebook-icon");
const twitterIcon = document.getElementById("twitter-icon");
const shortenedURL = document.getElementById("shortenedURL")

// Add event listeners for social sharing
facebookIcon.addEventListener("click", shareOnFacebook);
twitterIcon.addEventListener("click", shareOnTwitter);

// Sharing functions
function shareOnFacebook() {
  const url = encodeURIComponent(window.location.href);
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  window.open(shareUrl, "_blank");
}

function shareOnTwitter() {
  const text = encodeURIComponent("Check out this awesome product!");
  const url = encodeURIComponent(window.location.href);
  const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  window.open(shareUrl, "_blank");
}

// function to shorten URL
async function urlshortener(url) {
  try {
    let request = await fetch(
      `https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`
    );
    let response = await request.json();
    shortenedURL.innerText = response.result.full_short_link;
    return response.result.full_short_link;
  } catch (error) {
    return "";
  }
}

urlshortener(window.location.href)
