
import {BuilderComp, WC, WCList} from '../builder/types';
import {Link, MediaComp, mediaProps, MediaProps} from "../comps";
import {ListField, NumberField, StringField, useBuilderContext} from "../builder";
import {BuilderProps} from "../builder/builder";
import { useCallback, useEffect, useRef } from 'react';
import $ from 'jquery';
import WOW from 'wowjs';
import 'animate.css/animate.min.css';
import dynamic from 'next/dynamic';


interface Nav{
    logo:MediaProps;
    links: WCList<{
        title: WC<string>,
        href: WC<string>,
    }>,
    contact:{
        title: WC<string>,
        href: WC<string>
    }
}

interface BannerRight {
    image: MediaProps;
    cup: {
        cupImg: MediaProps,
        desc: WC<string>,
    },
    admin: {
        adminImg: MediaProps,
        desc: WC<string>,
        nbr: WC<number>,
        str: WC<string>
    }
}

interface Props {
    nav: Nav,
    links: WCList<{
        href: WC<string>,
        icon: WC<String>
    }>,
    intro: WC<string>,
    name: WCList<{
        parg: WC<string>,    
    }>,
    desc: WC<string>,
    button1:{
        title: WC<string>,
        href: WC<string>,
    } 
    button2: {
        title: WC<string>,
        href: WC<string>,
    },
    
    banner1: BannerRight,
}
const navbar = {
    logo: mediaProps(null),
    links: ListField({
        props: {
            title: StringField({type:'short', default: "New Link"}),
            href:StringField({type:'short', default:" " }),
        },
        default:[
            
            {title: 'Services', href:'service-con'},
            {title: "About", href:"about-con" },
            {title: "Portfolio", href:"Portfolio" },
            {title: "Testimonials", href:"testimonials" },
            {title: "Blog", href:"blog" }
        ]
    }),
    contact:{
        title: StringField({type:'short', default:"Contact" }),
        href: StringField({type:'short', default:"#Contact" }),
    }
}

const bannerProps ={
    image: mediaProps(null),
    cup: {
        cupImg: mediaProps(null),
        desc: StringField({type: 'styled', default:"Best Design Award." })
    },
    admin: {
        adminImg: mediaProps(null),
        desc: StringField({type: 'styled', default:"Happy Customers" }),
        nbr : NumberField({type:"float"}),
        str : StringField({type:"short" , default: " k+"}),
    }
}

const props = {
    nav: navbar,
    links: ListField({
        props:{
            href: StringField({type:'short', default: "https://newLink.com"}),
            icon: StringField({type:'short', default:"icon"}),
        },
        default:[
            {href:"https://www.behance.net/", icon: "behance" },
            {href: "https://dribbble.com/", icon:"dribbble ml-0 mr-0" },
            {href: "https://www.linkedin.com/" , icon:"linkedin-in" }
        ],
    }),
    intro: StringField({type:"styled", default:"Hello, I Am " }),
    name:ListField({
        props: {
            parg: StringField({type:"short", default:"Alina Parker" }),
        },
        default: Array(4).fill({
            parg: "Alina Parker",
        }) 
    }),
    desc:StringField({type:"styled", default:" Duis aute irure dolor in reprehenderit in voluptareu dolore eu fugiat nulla pariatur." }),
    button1:{
        title: StringField({type:'short', default:"Hire Me" }),
        href: StringField({type:'short', default:"#Contact" }),
    },
    button2:{
        title: StringField({type:'short', default:"See My Work" }),
        href: StringField({type:'short', default:"#Portfolio" }),
    },

    banner1: bannerProps,
}


export default function Header( {nav,links,intro,name,desc,button1,button2,banner1,...props }: Props ){
    const {c} = useBuilderContext();

    {/*useEffect(() => {
        // Ensure WOW.js is only executed in the browser
        if (typeof window !== 'undefined') {
          new WOW.WOW({
            live: false
          }).init();
        }
      }, []);*/}

      useEffect(() => {
        import('wowjs').then(WOW => {
          new WOW.WOW({
            live: false,
          }).init();
        });
      }, [])


    useEffect(()=>{        
        $(window).scroll(function(){
            if ($(window).scrollTop() >= 113) {
                $('header').addClass('fixed-header');
                $('.banner-main-con').addClass('banner-main-con2');
            } else {
                $('header').removeClass('fixed-header');
                $('.banner-main-con').removeClass('banner-main-con2');
            }
        });
    })

    useEffect(()=>{
        document.querySelectorAll('.nav-item a').forEach(function(link, index){
            link.addEventListener('click', function() {
                if(this.classList.contains('is-active')) {
                    this.classList.remove('is-active');
                } else {
                    const activeLink = document.querySelector('a.is-active');
                    if (activeLink) {
                    activeLink.classList.remove('is-active');
                    }
                    this.classList.add('is-active');
                }
            });
        });

        document.querySelectorAll('#myBtnContainer button').forEach(function(link, index){
            link.addEventListener('click', function() {
                if(this.classList.contains('active_button')) {
                    this.classList.remove('active_button');
                } else {
                    const activeLink = document.querySelector('#myBtnContainer button.active_button');
                    if (activeLink) {
                    activeLink.classList.remove('active_button');
                    }
                    this.classList.add('active_button');
                }
            });
        });

    })
    
    useEffect(()=>{
    const handleSmoothScroll = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      };
  
      const links = document.querySelectorAll('a.nav-link');
      links.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
      });
  
      return () => {
        links.forEach(link => {
          link.removeEventListener('click', handleSmoothScroll);
        });
      };
    })
    

    const cursorRef = useRef(null);
    const cursorInnerRef = useRef(null);
    const bannerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorInner = cursorInnerRef.current;
        const banner = bannerRef.current;
    
        const handleMouseMove = (e) => {
          cursor.style.visibility = "visible";
          cursorInner.style.visibility = "visible";
          cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
          cursorInner.style.left = `${e.clientX}px`;
          cursorInner.style.top = `${e.clientY}px`;
        };
    
        const handleMouseOver = () => {
          cursor.classList.add('cursor');
          cursorInner.classList.add('cursor2');
        };
    
        const handleMouseOut = () => {
          cursor.style.visibility = "hidden";
          cursorInner.style.visibility = "hidden";
        };
    
        if (banner) {
          banner.addEventListener('mousemove', handleMouseMove);
          banner.addEventListener('mouseover', handleMouseOver);
          banner.addEventListener('mouseout', handleMouseOut);
        }
    
        return () => {
          if (banner) {
            banner.removeEventListener('mousemove', handleMouseMove);
            banner.removeEventListener('mouseover', handleMouseOver);
            banner.removeEventListener('mouseout', handleMouseOut);
          }
        };
      }, []);

    
     return (
        <div {...c(props)} className="header-and-banner-con w-100 float-left position-relative">
            <div className="header-and-banner-inner-con">
                <header className="main-header">
                {/*navbar-start*/}
                    <div className="container pl-0 pr-0">
                        <div className="header-con">
                            <nav className="navbar navbar-expand-lg navbar-light p-0">
                                <a  className="navbar-brand p-0" href="index.html">
                                    {!nav.logo.media.public_id && <img {...c(nav.logo.media)} src="assets/image/logo-img.png" alt="logo-img" className="img-fluid"/>}
                                    { nav.logo.media.public_id && <MediaComp.comp {...nav.logo}/>}
                                </a>
                                <button
                                className="navbar-toggler p-0 collapsed"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                                >
                                    <span className="navbar-toggler-icon" />
                                    <span className="navbar-toggler-icon" />
                                    <span className="navbar-toggler-icon" />
                                </button>
                                <div
                                className="collapse navbar-collapse justify-content-end"
                                id="navbarSupportedContent"
                                >
                                    <ul {...c(nav.links)} className="navbar-nav ml-auto">
                                        <li className="nav-item active pl-0" >
                                            <a className={"nav-link p-0 is-active"} href="index.html">
                                                Home<span className="sr-only">(current)</span>
                                            </a>
                                        </li>
                                        {nav.links[0].map((link, index)=>{
                                            return(
                                                <li {...c(link)} key={index} className="nav-item">
                                                    <a {...c(link.title, link)} className="nav-link p-0" href={link.href[0]} >
                                                        {link.title[0]}
                                                    </a>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                <div {...c(nav.contact)} className="d-inline-block contact">
                                    <a {...c(nav.contact.title, nav.contact)} href={nav.contact.href[0]} >
                                        {nav.contact.title[0]}
                                    </a>
                                </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                {/*navbar-end*/}
                </header>
                <section  className="banner-main-con" id="home">
                    <div className="container pl-0 pr-0">
                        {/*banner-start*/}
                        <div className="footer-social-icon banner-social-icon mb-0">
                            <ul {...c(links)} className="mb-0 list-unstyled">
                                {links[0].map((link, index)=>{
                                    return(
                                        <li {...c(link)} key={index} className="mt-3 mb-3">
                                            <a {...c(link,link.icon)} href={link.href[0]}>
                                                <i className={`fab fa-${link.icon[0]} d-flex align-items-center justify-content-center`}/>
                                            </a>
                                        </li>
                                    )
                                })}
                                
                            </ul>
                        </div>
                        <div className="banner-con text-lg-left text-center">
                            <div className="row">
                                <div className="col-lg-7 col-sm-12 d-flex justify-content-center flex-column">
                                    <div className="banner-left-con wow slideInLeft " >
                                        <div className="banner-heading">
                                            <h2 {...c(intro)} dangerouslySetInnerHTML={{__html: intro[0]}} ></h2>
                                            <ul {...c(name)} className="dynamic-txts">
                                                {name[0].map((item, index)=>{
                                                    return(
                                                        <li {...c(item)} key={index} >
                                                            <h1>{item.parg[0]}</h1>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                            <p {...c(desc)} dangerouslySetInnerHTML={{__html: desc[0]}}></p>
                                        </div>
                                        <div className="banner-btn generic-btn d-inline-block">
                                            <a {...c(button1.title, button1)} href={button1.href[0]}> {button1.title[0]} </a>
                                        </div>
                                        <a {...c(button2.title, button2)} href={button2.href[0]} className="See-btn">
                                            {button2.title[0]}
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-sm-12">
                                    <div ref={bannerRef}
                                        className="banner-right-con position-relative wow slideInRight" 
                                        id="banner-right-con" 
                                    >
                                        <figure className="mb-0">
                                            {!banner1.image.media.public_id && <img {...c(banner1.image.media)} src="assets/image/banner-right-img.png" alt="banner-right-img" id="banner-right-img" />}
                                            {banner1.image.media.public_id && <MediaComp.comp {...banner1.image} width={300} />}
                                        </figure>
                                        <div
                                        className="best-award-con d-inline-block wow bounceInUp"
                                        data-wow-duration="1s"
                                        data-wow-delay="1s"
                                        >
                                            <div className="best-award-inner-con">
                                                <figure className="mb-0">
                                                    {!banner1.cup.cupImg.media.public_id && <img {...c(banner1.cup.cupImg.media)} src="assets/image/cup-img.png" alt="cup-img" className="img-fluid" />}
                                                    {banner1.cup.cupImg.media.public_id && <MediaComp.comp {...banner1.cup.cupImg} />} 
                                                </figure>
                                                <div className="best-award-title">
                                                    <p {...c(banner1.cup.desc)} className="mb-0" dangerouslySetInnerHTML={{__html: banner1.cup.desc[0]}}></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                        className="best-award-con d-inline-block happy-con wow bounceInUp "
                                        data-wow-duration="1s"
                                        data-wow-delay="1s"
                                        >
                                            <div className="best-award-inner-con text-center">
                                                <figure>
                                                    {!banner1.admin.adminImg.media.public_id && <img {...c(banner1.admin.adminImg.media)} src="assets/image/admin-icon.png" alt="admin-icon" className="img-fluid" />}
                                                    {banner1.admin.adminImg.media.public_id && <MediaComp.comp {...banner1.admin.adminImg}/>}
                                                </figure>
                                                <div {...c(banner1.admin)} className="best-award-title d-inline-block ml-0">
                                                    <p {...c(banner1.admin.nbr)} className="mb-0 d-inline-block count">{banner1.admin.nbr[0]}</p>
                                                    {" "}
                                                    <p {...c(banner1.admin.str)} className="mb-0 d-inline-block">{banner1.admin.str[0]}</p>
                                                    <span {...c(banner1.admin.desc)} className="d-block cup"  dangerouslySetInnerHTML={{__html: banner1.admin.desc[0]}}></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cursor" ref={cursorRef}/>
                                        <div className="cursor2"  ref={cursorInnerRef} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*banner-end*/}
                    </div>
                </section>
            </div>
        </div>

    );
}
export const HeaderComp: BuilderComp = {
    name: "Header",
    comp: Header,
    props
}