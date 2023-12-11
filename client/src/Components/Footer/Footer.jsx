import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import tazaCocoa from '../../assets/icons/taza-cocoa-marron.svg'
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate()

  return (
    <footer>
      <button onClick={() => navigate(-1)} className="button-5"><FaCaretLeft /></button>
      <img src={tazaCocoa} onClick={() => navigate('/')} />
      <button onClick={() => navigate(1)} className="button-5"><FaCaretRight /></button>
    </footer>
  )
}