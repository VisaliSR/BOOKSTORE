import "./Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const Footer = () => {
  return (
    <div className="footer-cont1">
      <div className="footer-cont">
        <div className="f-social">
          <a href="https://www.instagram.com/" className="instagram" title="Instagram" target="_blank" rel="noopener noreferrer">
            <InstagramIcon className="f-icon " sx={{ fontSize: 32 }} />
          </a>
          <a href="https://twitter.com/" className="twitter" title="Twitter" target="_blank" rel="noopener noreferrer">
            <TwitterIcon className="f-icon " sx={{ fontSize: 32 }} />
          </a>
          <a href="https://www.linkedin.com/in/" className="linkedin" title="LinkedIn" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon className="f-icon " sx={{ fontSize: 32 }} />
          </a>
          <a href="https://github.com/" className="github" title="Github" target="_blank" rel="noopener noreferrer">
            <GitHubIcon className="f-icon " sx={{ fontSize: 32 }} />
          </a>
          <a href="mailto:" className="mail" title="Mail" rel="noopener noreferrer">
            <MailOutlineIcon className="f-icon " sx={{ fontSize: 32 }} />
          </a>
        </div>
        <div className="copy-txt">©Copyright All rights reserved</div>
      </div>
    </div>
  );
};

export default Footer;
