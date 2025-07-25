import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-5xl mx-auto px-4">
        <ul className="space-y-2">
          <li>
            <h1 className="text-lg font-semibold">
              Made By: Christian Calayag
            </h1>
          </li>
          <li>
            <a
              href="mailto:Christiancalayag222@gmail.com"
              className="hover:underline"
            >
              Christiancalayag222@gmail.com
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ShadowDawn2021"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              github.com/ShadowDawn2021
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
