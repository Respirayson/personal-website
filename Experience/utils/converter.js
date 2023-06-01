export default function(elem) {
  elem.style.overflow = "hidden";
  elem.innerHTML = elem.innerText
    .split("")
    .map((char) => {
        if (char === " ") {
            return `<span>&nbsp;</span>`;
        }
      return `<span class="animated-letter">${char}</span>`;
    })
    .join("");

    return elem;
}