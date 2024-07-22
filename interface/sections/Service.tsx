import { useRef, useEffect } from "react"
import { ListField, StringField, useBuilderContext } from "../builder"
import { BuilderComp, WC, WCList } from "../builder/types"
import { MediaComp, mediaProps, MediaProps } from "../comps"

interface Props{
    title: WC<string>,
    desc: WC<string>,

    box1: WCList<{
        image: MediaProps,
        title: WC<string>,
        parag: WC<string>,
        btn: {
            href:WC<string>,
            name: WC<string>
        }
    }>,

    box2: WCList<{
        image: MediaProps,
        title: WC<string>,
        parag: WC<string>,
        btn: {
            href:WC<string>,
            name: WC<string>
        }
    }>,
    
}

const props ={
    title : StringField({type:'short', default:"My Expertise"}),
    desc : StringField({type:"styled", default: "Provide Wide Range of     Digital Services"}),
    box1: ListField({
        props:{
            image: mediaProps(null),
            title: StringField({type:'short', default:"Tilte"}),
            parag: StringField({type:'short', default:""}),
            btn: {
                href: StringField({type:'short', default:"#"}),
                name: StringField({type:'short', default:"Read More"}),
            }
        },
        default: [
            {
                image: "assets/image/service-icon1.png",
                title: "Ui/Ux Design",
                parag: "Dolor repellendus temporibus autem quibusdam officiis debitis rerum neces aibus minima veniam.",
            },
            {
                image: "assets/image/service-icon2.png",
                title: "Web Design",
                parag: "Dolor repellendus temporibus autem quibusdam officiis debitis rerum neces aibus minima veniam.",
            }
        ]
        
    }),
    box2: ListField({
        props:{
            image: mediaProps(null),
            title: StringField({type:'short', default:"Tilte"}),
            parag: StringField({type:'short', default:""}),
            btn: {
                href: StringField({type:'short', default:"#"}),
                name: StringField({type:'short', default:"Read More"}),
            }
        },
        default: [
            {
                image: "assets/image/service-icon3.png",
                title: "Web Development",
                parag: "Dolor repellendus temporibus autem quibusdam officiis debitis rerum neces aibus minima veniam.",
            },
            {
                image: "assets/image/service-icon4.png",
                title: "App Development",
                parag: "Dolor repellendus temporibus autem quibusdam officiis debitis rerum neces aibus minima veniam.",
            }
        ]
        
    }),
    
    
}

export default function Service({title,desc,box1,box2,...props}: Props){
    const { c } = useBuilderContext()

    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorInnerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorInner = cursorInnerRef.current;
        const items = itemsRef.current;
        const sectionElement = document.querySelectorAll('.service-box-item');

        const handleMouseMove = (e: MouseEvent) => {
            if (cursor && cursorInner) {
                const x = e.clientX;
                const y = e.clientY;
                cursor.style.visibility = "visible";
                cursorInner.style.visibility = "visible";
                cursor.style.transform = `translate3d(calc(${x}px - ${cursor.offsetWidth / 2}px), calc(${y}px - ${cursor.offsetHeight / 2}px), 0)`;
                cursorInner.style.left = `${x}px`;
                cursorInner.style.top = `${y}px`;
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            (e.currentTarget as HTMLElement).style.transform = `rotate(-1deg)`;
        };

        const handleMouseOut = (e: MouseEvent) => {
            if (cursor && cursorInner) {
                cursor.style.visibility = "hidden";
                cursorInner.style.visibility = "hidden";
            }
            (e.currentTarget as HTMLElement).style.transform = 'rotate(0deg)';
        };

        sectionElement.forEach(item => {
            item.addEventListener('mousemove', handleMouseMove);
            item.addEventListener('mouseover', handleMouseOver);
            item.addEventListener('mouseout', handleMouseOut);
        });

        return () => {
            sectionElement.forEach(item => {
                item.removeEventListener('mousemove', handleMouseMove);
                item.removeEventListener('mouseover', handleMouseOver);
                item.removeEventListener('mouseout', handleMouseOut);
            });
        };
    }, []);

    return(
        <section {...c(props)}
        className="w-100 float-left service-con padding-top padding-bottom position-relative"
        id="service-con"
        >
            <div className="container">
                <div className="service-inner-con position-relative">
                    <div className="generic-title text-center">
                        <h6 {...c(title)} >{title[0]}</h6>
                        <h2 {...c(desc)} className="mb-0" dangerouslySetInnerHTML={{__html: desc[0]}}></h2>
                    </div>
                    <div className="service-box wow fadeInUp">
                        <div {...c(box1)} className="row">
                                {box1[0].map((item, index)=>{
                                    return(
                                        <div {...c(item)} key={index} className="col-lg-6 col-md-6">
                                            <div className="service-box-item " ref={el => (itemsRef.current[index] = el)}>
                                                <figure className="mb-0">
                                                    {!item.image.media.public_id && <img {...c(item.image.media)} src="assets/image/service-icon1.png" alt="service-icon"className="img-fluid" />}
                                                    { item.image.media.public_id && <MediaComp.comp {...item.image}/>}
                                                </figure>
                                                <div className="service-box-item-content">
                                                    <h4 {...c(item.title)}>{item.title[0]}</h4>
                                                    <p {...c(item.parag)}>
                                                        {item.parag[0]}
                                                    </p>
                                                    <a {...c(item.btn.name)} href={item.btn.href[0]} data-toggle="modal" data-target="#Ui-Design">
                                                        {item.btn.name[0]}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                        <div className="row mb-0">
                                {box2[0].map((item, index)=>{
                                        return(
                                            <div className="col-lg-6 col-md-6">
                                                <div {...c(item)} key={index} className="service-box-item mb-0" ref={el => (itemsRef.current[box1[0].length + index] = el)} >
                                                    <figure className="mb-0">
                                                        {!item.image.media.public_id && <img {...c(item.image.media)} src="assets/image/service-icon3.png" alt="service-icon"className="img-fluid" />}
                                                        { item.image.media.public_id && <MediaComp.comp {...item.image}/>}
                                                    </figure>
                                                    <div className="service-box-item-content">
                                                        <h4 {...c(item.title)}>{item.title[0]}</h4>
                                                        <p {...c(item.parag)}>
                                                            {item.parag[0]}
                                                        </p>
                                                        <a {...c(item.btn.name)} href={item.btn.href[0]} data-toggle="modal" data-target="#Ui-Design">
                                                            {item.btn.name[0]}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                })}
                            
                        </div>
                    </div>
                    <div className="cursor" ref={cursorRef}></div>
                    <div className="cursor2" ref={cursorInnerRef}></div>
                </div>
            </div>
        </section>

    )
}

export const ServiceComp: BuilderComp = {
    name: "Service",
    comp: Service,
    props
}