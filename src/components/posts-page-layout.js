import React from "react"
import Helmet from 'react-helmet';
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"

const shortcodes = { Link } // Provide common components here

export default function PageTemplate({ data: { mdx } }) {
  return (
    <div>
      <Layout>
        <Helmet>
          <title>{mdx.frontmatter.title}</title>
          <meta name="description" content={mdx.frontmatter.metaDescription} />
        </Helmet>
        <div className="blog-post-container">
          <article className="post">

            {!mdx.frontmatter.thumbnail && (
              <div className="post-thumbnail">
                <h1 className="post-title">{mdx.frontmatter.title}</h1>
                <div className="post-meta">{mdx.frontmatter.date}</div>
              </div>
            )}
            {!!mdx.frontmatter.thumbnail && (
              <div className="post-thumbnail" style={{ backgroundImage: `url(${mdx.frontmatter.thumbnail})` }}>
                <h1 className="post-title">{mdx.frontmatter.title}</h1>
                <div className="post-meta">{mdx.frontmatter.date}</div>
              </div>
            )}
            <div className="blog-post-content" >
              <MDXProvider components={shortcodes}>
                <MDXRenderer>{mdx.body}</MDXRenderer>
              </MDXProvider>
            </div>
          </article>
        </div>
      </Layout>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        thumbnail,
        date,
        metaDescription
      }
    }
  }
`