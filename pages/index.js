import React, { Component } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const PostLink = (props) => {
  return (
    <Link as={`/p/${props.id}`} href={`/post?id=${props.id}`}>
      <a>read</a>
    </Link>
  )
}

export default class extends Component {
  static async getInitialProps() {
    const resPosts = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const posts = await resPosts.json();
    return { posts };
  }

  componentWillMount() {
    this.setState({
      posts: this.props.posts
    })
  }

  render () {
    return (
      <Layout>
        <p>Posts</p>
        <table>
          <thead>
          <tr>
            <td>ID</td>
            <td>Actions</td>
            <td>Title</td>
          </tr>
          </thead>
          <tbody>
          {this.props.posts.map(post => {
            return (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td><PostLink id={post.id}/></td>
                <td>{post.title}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </Layout>
    )
  }

}