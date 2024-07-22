import React, {useEffect} from 'react';
import {BuilderComp, WC, WCList} from '../builder/types';
import {Link, MediaComp, mediaProps, MediaProps} from "../comps";
import {ListField, StringField, useBuilderContext} from "../builder";
import {BuilderProps} from "../builder/builder";

interface Props {
    logo:MediaProps;
    links:WCList<{
        title: WC<string>;
        href: WC<string>;
    }>;
   
    copyright: WC<string>;
    button:{
        title: WC<string>;
        href: WC<string>;
    };
    socialIcons: WCList<{
      platform: WC<string>;
      href: WC<string>;
      iconClass: WC<string>;
  }>;
}
const props = {
    logo: mediaProps(null),
    links: ListField({
        props: {
            title: StringField({ type: 'short', default: "New Link" }),
            href: StringField({ type: 'short', default: "#" })
        },
        default:[
            {title: "Home", href: "#home"},
            {title: "About", href: "#about-con"},
            {title: "ServiceS", href: "#service-con"},
            {title: "Portfolio", href: "#Portfolio"},
            {title: "Blog", href: "#testimonials"},
            {title: "Contact", href: "#Contact"},

        ]
    }),
   
    copyright: StringField({type: "short", default: "Copyright 2022 FolioFlix.com | All Rights Reserved."}),
    button:{
        title: StringField({type: "short", default: "Hire me"}),
        href: StringField({ default:"#" })
    },
    socialIcons: ListField({
      props: {
          platform: StringField({ type: 'short', default: "LinkedIn" }),
          href: StringField({ type: 'short', default: "https://www.linkedin.com/" }),
          iconClass: StringField({ type: 'short', default: "fab fa-linkedin-in" })
      },
      default: [
          { platform: "Behance", href: "https://www.behance.net/", iconClass: "fab fa-behance" },
          { platform: "Dribbble", href: "https://dribbble.com/", iconClass: "fab fa-dribbble" },
          { platform: "LinkedIn", href: "https://www.linkedin.com/", iconClass: "fab fa-linkedin-in" },
      ]
  })
}


const Footer = ({button,copyright, links, logo, socialIcons, ...props}: Props) => {
    const {c} = useBuilderContext();

    return (
        <div {...c(props)}className="w-100 float-left weight-footer-con position-relative">
        <div className="container">
          <div className="weight-footer-content text-center wow fadeInUp">
            <figure className="">
            {!logo.media.public_id && <img {...c(logo.media)} src="assets/image/logo-img.png" alt="logo-img" className="img-fluid"/>}
            { logo.media.public_id && <MediaComp.comp {...logo}/>}
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
                        <ul {...c(socialIcons)} className="mb-0">
                            {socialIcons[0].map((icon, index) => (
                                <li {...c(icon)} className="d-inline-block" key={index}>
                                    <a {...c(icon.href)} href={icon.href[0]}>
                                        <i {...c(icon.iconClass)} className={`${icon.iconClass[0]} d-flex align-items-center justify-content-center`} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
          </div>
          <div className="copy-right-content text-center">
            <p {...c(copyright)}className="mb-0">
              {copyright[0]}
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
