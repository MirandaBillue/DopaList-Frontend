import React from 'react';

function Footer() {
  return (
    <div className="row"
      style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        right: 0,
      }} >
      <div className="twelve columns">
        <ul className="copyright">
          <li><strong> Copyright © Dopa-List 2022</strong></li>
          <li>
            <strong>Design by Miranda Billue</strong>
          </li>
        </ul>
      </div>
      <div id="go-top">
        <a className="smoothscroll" title="Back to Top" href="/">
          <i className="icon-up-open"></i>
        </a>
      </div>
    </div>
  )
}

export default Footer;