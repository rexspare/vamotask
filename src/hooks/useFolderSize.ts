import { useEffect, useState } from "react";

const useFolderSize = () => {
  const [folderSize, setFolderSize] = useState(2.5);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 480) {
        setFolderSize(1.2); // Mobile
      } else if (width <= 768) {
        setFolderSize(1.7); // Tablet
      } else if (width <= 1024) {
        setFolderSize(2); // Small desktops
      } else {
        setFolderSize(2.5); // Large screens
      }
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return folderSize;
};

export default useFolderSize;
