
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
            {title: "About", href: "#"},
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


const Header = () => {
    const {c} = useBuilderContext();
    return (
        <>
             <header {...c(props)} className="main-header">
                    {/*navbar-start*/}
                    <div className="container pl-0 pr-0">
                        <div className="header-con">
                        <nav className="navbar navbar-expand-lg navbar-light p-0">
                            <a className="navbar-brand p-0" href="index.html">
                            <img
                                src="assets/image/logo-img.png"
                                alt="logo-img"
                                className="img-fluid"
                            />
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
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active pl-0">
                                <a className="nav-link p-0 is-active" href="index.html">
                                    Home<span className="sr-only">(current)</span>
                                </a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link p-0" href="#service-con">
                                    Services
                                </a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link p-0" href="#about-con">
                                    About
                                </a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link p-0" href="#Portfolio">
                                    Portfolio
                                </a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link p-0" href="#testimonials">
                                    Testimonials
                                </a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link p-0" href="#blog">
                                    Blog
                                </a>
                                </li>
                            </ul>
                            <div className="d-inline-block contact">
                                <a href="#Contact">Contact</a>
                            </div>
                            </div>
                        </nav>
                        </div>
                    </div>
                    {/*navbar-end*/}
                    </header>


        </>
    );
}
export const HeaderComp: BuilderComp = {
    name: "Header",
    comp: Header,
    props
}