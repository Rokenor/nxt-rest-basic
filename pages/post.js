import React, { Component } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

export default class extends Component {
  static async getInitialProps(context) {
    const { id } = context.query;
    // get post
    const resPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const post = await resPost.json();
    // get comments
    const resComments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
    const comments = await resComments.json();

    return { post, comments };
  }

  componentWillMount () {
    this.setState({
      post: this.props.post,
      comments: this.props.comments
    })
  }

  render () {
    return (
      <Layout>
        <Link href="/"><a>back to posts list</a></Link>
        <h1>{this.props.post.title}</h1>
        <p>PostID: {this.props.post.id}; UserID: {this.props.post.userId}</p>
        <p>{this.props.post.body}</p>
        <p>----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----</p>
        <h3>Comments</h3>
        {this.props.comments.map(comment => {
          return (
            <div key={comment.id}>
              <p><span>Name: {comment.name}</span>; <span>Email: {comment.email}</span>; <span>CommentID: {comment.id}</span>; <span>PostID: {comment.postId}</span></p>
              <p>Comment: {comment.body}</p>
              <p>---- ---- ----</p>
            </div>
          )
        })}
      </Layout>
    )
  }
}
