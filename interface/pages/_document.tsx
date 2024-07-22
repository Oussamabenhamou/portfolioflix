import { NextComponentType } from 'next';
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import Link from 'next/link';
import { NextRouter, withRouter } from "next/router";
import Script from 'next/script';


interface WithRouterProps {
    router: NextRouter
}

interface DocumentProps extends WithRouterProps {}

class MyDocument extends Document<DocumentProps> {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)

        return { ...initialProps, locale: ctx?.locale }
    }

    render() {
        const locale = this.props.locale;
        const dir = locale === "ar" ? "rtl" : "ltr";
        
        
        
        return (
          <Html dir={dir} lang={locale}>
            <Head>
                <meta charSet="utf-8" />
                <meta name="format-detection" content="telephone=no"></meta>

                
                <meta name="description" content="Hi there! I'm El Kaimouni Abderrahmane, a dedicated Software Engineer and Data Scientist student passionate about crafting innovative solutions. Specializing in Web Development, skilled in both frontend and backend, I excel in DevOps practices, I'm proficient in deploying projects on various hosting environments, including VPS and cloud services, I bring a wealth of technical expertise to the table." />

                <link rel="icon" href="/favicon.png" />
                <link rel="stylesheet" href="/assets/css/animate.css"/>
                <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />
                <link rel="stylesheet" href="/assets/bootstarp/bootstrap.min.css" />
                <link rel="stylesheet" href="/assets/css/super-classes.css"/>
                <link rel="stylesheet" href="/assets/css/style.css"/>
                <link rel="stylesheet" href="/assets/css/mobile.css"/>
            </Head>
            <body>
                <Main />
                <NextScript />
                
                <Script src="assets/js/wow.js" strategy='beforeInteractive' />
                
                <Script src="/assets/js/jquery-3.6.0.min.js" /> 
                <Script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.js" strategy='beforeInteractive'/>
                <Script src="/assets/js/popper.min.js"  strategy='beforeInteractive'/> 
                <Script src="/assets/js/bootstrap.min.js" strategy='beforeInteractive'/> 
                {/*<Script src="/assets/js/custom-Script.js" strategy='beforeInteractive'/> */}
                <Script src="/assets/js/contact-form.js" strategy='beforeInteractive' />

            </body>
          </Html>
        )
      }
}

export default withRouter(MyDocument as NextComponentType<DocumentContext, any, any>);
