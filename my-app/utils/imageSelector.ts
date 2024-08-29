import image1 from "images/arctic-fox.webp";
import image2 from "images/elephants.webp";
import image3 from "images/honey-bee.webp";
import image4 from "images/whale.webp";

export const imageSelector = (index: number) => {
  const images = [image1, image2, image3, image4];
  return images[index]
};