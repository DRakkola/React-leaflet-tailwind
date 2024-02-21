// useImage.js
import { useQuery } from "@tanstack/react-query";
import { fetchImageDataUrl } from '../api/ImageClient'; // Ensure this path is correct

const useImage = (key) => {
  useQuery({queryKey: ['imageData'],
   queryFn: async () => {return fetchImageDataUrl(key)},
  
  });
};

export default useImage;
