import React from 'react';
import { BuilderComp, WC, WCList } from '../builder/types';
import { StringField, ListField, useBuilderContext, ModelField } from "../builder";
import { MediaComp, mediaProps, MediaProps } from "../comps";
import { image } from '@cloudinary/url-gen/qualifiers/source';

interface BlogItemProps {
    image: MediaProps;
    author: WC<string>;
    date: WC<string>;
    title: WC<string>;
    description: WC<string>;
    link: WC<string>;
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
        props: ModelField({ model: "blogs", query: "{ image { public_id width height } author date title description link }" }),
        default: new Array(3).fill({
                image: mediaProps(null),
                author: "author name",
                date: new Date().toDateString(),
                title: "blog title",
                description: "Dolor repellendus temporibus autem quibusdam officiis debitis rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
                link: "#",
        } ) as BlogItemProps[]
    })
};

const blogs = ({ sectionTitle, sectionSubtitle, blogItems }: Props) => {
    const { c } = useBuilderContext();
    // Define mediaProps to handle default values properly

    return (
        <section {...c(props)}
                className="w-100 float-left blog-con padding-top padding-bottom position-relative"
                id="blog"
                >
                <div className="container">
                    <div className="blog-inner-con position-relative">
                    <div className="generic-title text-center">
                        <h6 {...c(sectionSubtitle)}>{sectionSubtitle[0]}</h6>
                        <h2 className="mb-0"{...c(sectionTitle)}>{sectionTitle[0]}</h2>
                    </div>
                    <div className="blog-box wow fadeInUp">
                        <div {...c(blogItems)} className="row">
                            {blogItems[0].map((blogItem, index) => (
                                <div className="col-lg-4" key={index}>
                                    <div className="blog-box-item">
                                        <div className="blog-img">
                                            <a {...c(blogItem.link)} href={blogItem.link}>
                                                <figure className="mb-0">
                                                {blogItem.image?.public_id ? (
                                                        <MediaComp.comp {...blogItem.image} width={400}/>
                                                    ) : (
                                                        <img src="/assets/image/blog-img-1.png" alt="blog-img" className="img-fluid"/>
                                                    )}
                                                    {/* {!blogItem.image && <img {...c(blogItem.image)} src="assets/image/blog-img-1.png" alt="blog-img" className="img-fluid"/>}
                                                    {blogItem.image && <MediaComp.comp {...blogItem.image} width={400}/>} */}
                                                </figure>
                                            </a>
                                        </div>
                                        <div className="blog-content">
                                            <div className="blog-auteher-title">
                                                <span {...c(blogItem.author)}>{blogItem.author}</span>
                                                <span {...c(blogItem.date)}className="float-lg-right">{blogItem.date}</span>
                                            </div>
                                            <a {...c(blogItem.link)} href={blogItem.link}>
                                                <h4{...c(blogItem.title)}>{blogItem.title}</h4>
                                            </a>
                                            <p {...c(blogItem.description)}>{blogItem.description}</p>
                                            <a {...c(blogItem.link)} href={blogItem.link}>Read More</a>
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
}

export const BlogsComp: BuilderComp = {
    name: "Blogs",
    comp: blogs,
    props
};