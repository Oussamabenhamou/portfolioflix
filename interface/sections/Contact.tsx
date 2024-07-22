import React, {useEffect} from 'react';
import {BuilderComp, WC, WCList} from '../builder/types';
import {Link, MediaComp, mediaProps, MediaProps} from "../comps";
import {ListField, StringField, useBuilderContext} from "../builder";
import {BuilderProps} from "../builder/builder";
import { image } from '@cloudinary/url-gen/qualifiers/source';


interface Props {
    small_title: WC<string>;
    huge_title: WC<string>;
    under_title: WC<string>;
    title1: WC<string>;
    title2: WC<string>;
    title3: WC<string>;
    address: WC<string>;
    emails: WCList<{ email: WC<string> }>;
    phones: WCList<{ phone: WC<string> }>;
    placeholders: {
        name: WC<string>;
        email: WC<string>;
        phone: WC<string>;
        subject: WC<string>;
        message: WC<string>;
    };
    buttonTitle: WC<string>;
    image: MediaProps;
}
const props = {
    small_title: StringField({type: "short", default: "Get in Touch"}),
    huge_title: StringField({type: "short", default: "Any Questions? Feel Free"}),
    under_title : StringField({type: "short", default: "to Contact"}),
    
    address: StringField({ type: 'short', default: '121 King Street Melbourne, 3000, Australia' }),
    title1: StringField({ type: 'short', default: 'Address' }),
    title2: StringField({ type: 'short', default: 'Email' }),
    title3: StringField({ type: 'short', default: 'Phone' }),
    emails: ListField({
        props: {
            email: StringField({ type: 'short', default: 'info@folioflix.com' })
        },
        default: [
            { email: 'info@folioflix.com' },
            { email: 'folioflix@gmail.com' }
        ]
    }),
    phones: ListField({
        props: {
            phone: StringField({ type: 'short', default: '+61 3 8376 6284' })
        },
        default: [
            { phone: '+61 3 8376 6284' },
            { phone: '+800 2345 6789' }
        ]
    }),
    placeholders: {
        name: StringField({ type: 'short', default: 'Name' }),
        email: StringField({ type: 'short', default: 'Email' }),
        phone: StringField({ type: 'short', default: 'Phone' }),
        subject: StringField({ type: 'short', default: 'Subject' }),
        message: StringField({ type: 'short', default: 'Message' }),
    },
    buttonTitle: StringField({ type: 'short', default: 'Submit' }),
    image: mediaProps(null),
};

const Contact = ({address,emails,phones,placeholders,buttonTitle,small_title,huge_title,image,title1,title2,title3,...props}: Props) => {
    const {c} = useBuilderContext();
    return (
        <>
                 <section className="w-100 float-left form-main-con padding-top padding-bottom" id="Contact" >
                    <div {...c(props)} className="container">
                        <div className="form-main-inner-con position-relative">
                        <div className="generic-title text-center">
                            <h6{...c(small_title)}>{small_title[0]}</h6>
                            <h2 {...c(huge_title)} className="mb-0">
                            {huge_title[0]}
                            <br {...c(props.under_title)} />
                            {props.under_title[0]}
                            </h2>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 order-lg-0 order-2">
                            <div className="contact-information position-relative wow slideInLeft">
                                <ul className="list-unstyled">
                                        <li>
                                            <figure className="mb-0 d-flex align-items-center justify-content-center">
                                            {!image.media.public_id && <img {...c(image.media)} src="assets/image/location-icon.png" alt="location-icon" className="img-fluid"/>}
                                            { image.media.public_id && <MediaComp.comp {...image}/>}
                                           
                                            </figure>
                                            <div className="contact-information-content">
                                            {/* <h5 {...c(title1)}>{title1}</h5> */}
                                            <h5>Address :</h5>
                                            <p {...c(address)}className="mb-0">
                                            {address[0]}
                                            </p>
                                            </div>
                                        </li>
                                        <li>
                                            <figure className="mb-0 d-flex align-items-center justify-content-center">
                                            {!image.media.public_id && <img {...c(image.media)} src="assets/image/message-icon.png" alt="message-icon" className="img-fluid"/>}
                                            { image.media.public_id && <MediaComp.comp {...image}/>}
                                           
                                            </figure>
                                            <div {...c(emails)}className="contact-information-content">
                                            {/* <h5 {...c(title2)}>{title2}</h5> */}
                                            <h5>Email :</h5>
                                            {emails[0].map((emailObj, index) => (
                                                    <p className="mb-0"{...c(emailObj.email)} key={index}>{emailObj.email[0]}</p>
                                                ))}
                                            </div>
                                        </li>
                                        <li className="mb-0">
                                            <figure className="mb-0 d-flex align-items-center justify-content-center">
                                            {!image.media.public_id && <img {...c(image.media)} src="assets/image/phone-icon.png" alt="phone-icon" className="img-fluid"/>}
                                            { image.media.public_id && <MediaComp.comp {...image}/>}
                                            
                                            </figure>
                                            <div {...c(phones)} className="contact-information-content">
                                            {/* <h5 {...c(title3)}>{title3}</h5> */}
                                            <h5>Phone :</h5>
                                            {phones[0].map((phoneObj, index) => (
                                                    <p className="mb-0"{...c(phoneObj.phone)} key={index}>{phoneObj.phone[0]}</p>
                                                ))}
                                            
                                            </div>
                                        </li>
                                </ul>
                            </div>
                            </div>
                            <div className="col-lg-8">
                            <div id="form_result"></div>
                            <form
                                id="contactpage"
                                method="POST"
                                className="contact-form wow slideInRight text-lg-left text-center"
                            >
                                <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <div className="form-group mb-0">
                                    <input 
                                        type="text"
                                        {...c(placeholders.name)}
                                        placeholder={placeholders.name[0]}
                                        name="name"
                                        id="name"
                                        autoComplete="off"
                                        required
                                    />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="form-group mb-0">
                                    <input 
                                        type="email"
                                        id="emailHelp"
                                        name="emailHelp"
                                        {...c(placeholders.email)}
                                        placeholder={placeholders.email[0]}
                                        autoComplete="off"
                                        required
                                    />
                                    <small className="form-text text-muted" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="form-group mb-0">
                                    <input 
                                        type="tel"
                                        {...c(placeholders.phone)}
                                        placeholder={placeholders.phone[0]}
                                        name="phone"
                                        id="phone"
                                        required
                                    />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="form-group mb-0">
                                    <input 
                                        type="text"
                                        name="subject"
                                        {...c(placeholders.subject)}
                                        placeholder={placeholders.subject[0]}
                                        id="subject"
                                    />
                                    </div>
                                </div>
                                </div>
                                <div className="row">
                                <div  className="col-lg-12">
                                    <div className=" form-group mb-0">
                                    <textarea {...c(placeholders.message)}
                                        placeholder={placeholders.message[0]}
                                        rows={3}
                                        name="comments"
                                        id="comments"
                                        defaultValue={""}
                                    />
                                    </div>
                                </div>
                                </div>
                                <button {...c(buttonTitle)} type="submit" id="submit" className="appointment-btn">
                                {buttonTitle[0]}
                                </button>
                            </form>
                            </div>
                        </div>
                        </div>
                    </div>
                    </section>

        
        </>
    );
}
export const ContactComp: BuilderComp = {
    name: "Contact",
    comp: Contact,
    props
};