import React from 'react';
import { BuilderComp, WC, WCList } from '../builder/types';
import { StringField, ListField, useBuilderContext } from "../builder";
import { mediaProps, MediaProps } from "../comps";

interface BlogItemProps {
    image: MediaProps;
    author: WC<string>;
    date: WC<string>;
    title: WC<string>;
    description: WC<string>;
    readMoreLink: WC<string>;
}

interface Props {
    sectionTitle: WC<string>;
    sectionSubtitle: WC<string>;
    blogItems: WCList<BlogItemProps>;
}

const props = {
    sectionTitle: StringField({ type: "short", default: "Latest News" }),
    sectionSubtitle: StringField({ type: "short", default: "Blog & Articles" }),
    blogItems: ListField({
        props: {
            image: mediaProps(null),
            author: StringField({ type: "short", default: "Author Name" }),
            date: StringField({ type: "short", default: "Date" }),
            title: StringField({ type: "short", default: "Blog Title" }),
            description: StringField({ type: "long", default: "Description" }),
            readMoreLink: StringField({ type: "short", default: "#" }),
        },
        default: [
            {
                image: { src: "assets/image/blog-img-1.png", alt: "blog-img" },
                author: "By David William",
                date: "Mar 8, 2022",
                title: "Quis autem vea eum iure reprehenderit",
                description: "Dolor repellendus temporibus autem quibusdam officiis debitis rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
                readMoreLink: "#"
            },
            {
                image: { src: "assets/image/blog-img-2.png", alt: "blog-img" },
                author: "By John Doe",
                date: "Mar 9, 2022",
                title: "Reprehenderit in voluptate velit esse cillum",
                description: "Dolor repellendus temporibus autem quibusdam officiis debitis rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
                readMoreLink: "#"
            },
            {
                image: { src: "assets/image/blog-img-3.png", alt: "blog-img" },
                author: "By Elina Parker",
                date: "Mar 10, 2022",
                title: "Soluta nobis est eligendi optio cumque",
                description: "Dolor repellendus temporibus autem quibusdam officiis debitis rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
                readMoreLink: "#"
            }
        ]
    })
};

const BlogSection = ({ sectionTitle, sectionSubtitle, blogItems }) => {
    const { c } = useBuilderContext();

    return (
        <section className="w-100 float-left blog-con padding-top padding-bottom position-relative" id="blog">
            <div className="container">
                <div className="blog-inner-con position-relative">
                    <div className="generic-title text-center">
                        <h6 {...c(sectionTitle)}>{sectionTitle[0]}</h6>
                        <h2 className="mb-0" {...c(sectionSubtitle)}>{sectionSubtitle[0]}</h2>
                    </div>
                    <div className="blog-box wow fadeInUp">
                        <div className="row">
                            {blogItems[0].map((item, index) => (
                                <div key={index} className="col-lg-4">
                                    <div className="blog-box-item">
                                        <div className="blog-img">
                                            <a href={item.readMoreLink[0]} data-toggle="modal" data-target={`#blog-model-${index}`}>
                                                <figure className="mb-0">
                                                    <img
                                                        {...c(item.image)}
                                                        src={item.image.src}
                                                        alt={item.image.alt}
                                                        className="img-fluid"
                                                    />
                                                </figure>
                                            </a>
                                        </div>
                                        <div className="blog-content">
                                            <div className="blog-auteher-title">
                                                <span {...c(item.author)}>{item.author[0]}</span>
                                                <span className="float-lg-right" {...c(item.date)}>{item.date[0]}</span>
                                            </div>
                                            <a href={item.readMoreLink[0]} data-toggle="modal" data-target={`#blog-model-${index}`}>
                                                <h4 {...c(item.title)}>{item.title[0]}</h4>
                                            </a>
                                            <p {...c(item.description)}>{item.description[0]}</p>
                                            <a href={item.readMoreLink[0]} data-toggle="modal" data-target={`#blog-model-${index}`}>
                                                Read More
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const BlogSectionComp: BuilderComp = {
    name: "BlogSection",
    comp: BlogSection,
    props
};
