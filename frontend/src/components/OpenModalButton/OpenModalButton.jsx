import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, //the component to render inside the modal once the button is clicked
  buttonText, //the text of the button that triggers the modal to open
  onButtonClick, //(optional) a callback function that will be called when the the button is clicked
  onModalClose //(optional) a callback function that will be called when the modal is closing
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button onClick={onClick}>{buttonText}</button>;
}

export default OpenModalButton;
