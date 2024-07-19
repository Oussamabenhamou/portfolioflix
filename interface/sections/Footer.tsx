import React, {useEffect} from 'react';
import {BuilderComp, WC, WCList} from '../builder/types';
import {Link, MediaComp, mediaProps, MediaProps} from "../comps";
import {ListField, StringField, useBuilderContext} from "../builder";
import {BuilderProps} from "../builder/builder";

interface Props {
    logo:WC<string>;
    links:WCList<{
        title: WC<string>;
        href: WC<string>;
    }>;
    small_title: WC<string>;
    huge_title: WC<string>;
    button:{
        title: WC<string>;
        href: WC<string>;
    };
    image:MediaProps;
}
const props = {
    logo: StringField({type: "short", default: "logo"}),
    links: ListField({
        props: {
            title: StringField({ type: 'short', default: "New Link" }),
            href: StringField({ type: 'short', default: "#" })
        },
        default:[
            {title: "Home", href: "#"},
            {title: "about-con", href: "#"},
            {title: "service-con", href: "#"},
            {title: "Portfolio", href: "#"},
            {title: "testimonials", href: "#"},
            {title: "Contact", href: "#"},

        ]
    }),
    small_title: StringField({type: "short", default: "I am Modesto Player"}),
    huge_title: StringField({type: "short", default: "I am Modesto Designer"}),
    button:{
        title: StringField({type: "short", default: "Hire me"}),
        href: StringField({ default:"#" })
    },
    image: mediaProps(null)
}


const Footer = ({button,huge_title, small_title, image, links, logo,...props}: Props) => {
    const {c} = useBuilderContext();

    return (
        <div {...c(props)}className="w-100 float-left weight-footer-con position-relative">
        <div className="container">
          <div className="weight-footer-content text-center wow fadeInUp">
            <figure className="">
              <img
                src="/image/footer-logo.png"
                alt="footer-logo"
                className="img-fluid"
              />
            </figure>
            <div className="footer-navbar">
                
              <ul {...c(links)} className="list-unstyled">
                {links[0].map((link,index) => (
                  <li {...c(link)} key={index} className="d-inline-block border-left-0 pl-0">
                  <a {...c(link.title, link)} href={link.href[0]} >{link.title[0]}</a>
                </li>
                ))}
                    
               
              </ul>
            </div>
            <div className="footer-social-icon">
              <ul className="mb-0">
                <li className="d-inline-block">
                  <a href="https://www.behance.net/">
                    <i className="fab fa-behance d-flex align-items-center justify-content-center" />
                  </a>
                </li>
                <li className="d-inline-block">
                  <a href="https://dribbble.com/">
                    <i className="fab fa-dribbble d-flex align-items-center justify-content-center" />
                  </a>
                </li>
                <li className="d-inline-block">
                  <a href="https://www.linkedin.com/">
                    <i className="fab fa-linkedin-in d-flex align-items-center justify-content-center" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="copy-right-content text-center">
            <p className="mb-0">
              Copyright 2022 FolioFlix.com | All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
      
    );
};

export const FooterComp: BuilderComp = {
    name: "Footer",
    comp: Footer,
    props
};
