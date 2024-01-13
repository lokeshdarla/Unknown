import React from "react";
import { Link} from "react-router-dom";
import { AudioLines } from 'lucide-react';
import { Twitter } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Instagram } from 'lucide-react';

export default function Footer() {
  return (
      <footer className="bg-white border-y px-2 mx-10">
          <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
              <div className="md:flex md:justify-between">
                  <div className="mb-6 md:mb-0">
                  <Link to="/" className="flex items-center text-blue-700 text-lg gap-2">
                    <AudioLines />
                   <h1 className="font-semibold">Unknown</h1>
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                      <div>
                          <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Resources</h2>
                          <ul className="text-gray-500 font-medium">
                              <li className="mb-4">
                                  <Link to="/" className="hover:underline">
                                      Home
                                  </Link>
                              </li>
                              <li>
                                  <Link to="/about" className="hover:underline">
                                      About
                                  </Link>
                              </li>
                          </ul>
                      </div>
                      <div>
                          <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Follow us</h2>
                          <ul className="text-gray-500 font-medium">
                              <li className="mb-4">
                                  <a
                                      href="https://github.com/hiteshchoudhary"
                                      className="hover:underline"
                                      target="_blank"
                                      rel="noreferrer"
                                  >
                                      Github
                                  </a>
                              </li>
                              <li>
                                  <Link to="/" className="hover:underline">
                                      Discord
                                  </Link>
                              </li>
                          </ul>
                      </div>
                      <div>
                          <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
                          <ul className="text-gray-500 font-medium">
                              <li className="mb-4">
                                  <Link to="#" className="hover:underline">
                                      Privacy Policy
                                  </Link>
                              </li>
                              <li>
                                  <Link to="#" className="hover:underline">
                                      Terms &amp; Conditions
                                  </Link>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
              <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
              <div className="sm:flex sm:items-center sm:justify-between ">
                  <span className="text-sm text-gray-500 sm:text-center gap-2">
                      © 2023
                      <a href="#" className="hover:underline">
                          Unknown
                      </a>
                      . All Rights Reserved.
                  </span>
                  <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
                      <Link to="#" className="text-gray-500 hover:text-gray-900">
                      <Facebook />
                      </Link>
                      <Link to="#" className="text-gray-500">
                      <Instagram/>
                      </Link>
                      <Link to="#" className="text-gray-500">
                       <Twitter/>
                      </Link>
                  </div>
              </div>
          </div>
      </footer>
  );
}
