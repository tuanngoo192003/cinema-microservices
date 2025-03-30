import { useState } from "react";

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showModal = () => setIsVisible(true);
  const hideModal = () => setIsVisible(false);
  const hideLoading = () => setIsLoading(false);
  const showLoading = () => setIsLoading(true);

  return {
    isVisible,
    isLoading,
    showModal,
    hideModal,
    hideLoading,
    showLoading,
  };
};

export default useModal;
