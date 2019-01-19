import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import MediaQuery from "react-responsive";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as MenuActions } from "~/store/ducks/menu";
import { Creators as BlogActions } from "~/store/ducks/blog";

import { FiClock } from "react-icons/fi";

import { FaCircleNotch } from "react-icons/fa";
import "~/styles/loading.css";

import { Container, Loading, Content } from "./styles";

class PostDetail extends Component {
  state = {};

  static propTypes = {
    updateActive: PropTypes.func.isRequired,
    showRequest: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      }).isRequired
    }).isRequired,
    blog: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      post: PropTypes.shape({
        title: PropTypes.string,
        content: PropTypes.string,
        readingTime: PropTypes.string,
        fromNow: PropTypes.string,
        file: PropTypes.shape({
          url: PropTypes.string
        }),
        user: PropTypes.shape({
          name: PropTypes.string
        })
      })
    }).isRequired
  };

  static defaultProps = {
    blog: {
      post: {}
    }
  };

  componentDidMount() {
    const { updateActive, showRequest, match } = this.props;
    updateActive({
      name: "Blog",
      page: "/blog"
    });
    showRequest(match.params.id);
  }

  render() {
    const { loading, post } = this.props.blog;

    const Detalhes = () => (
      <Fragment>
        <MediaQuery query="(max-width: 600px)">
          <h1 className="pequeno">{post.title}</h1>
        </MediaQuery>
        <MediaQuery query="(min-width: 600px)">
          <h1 className="grande">{post.title}</h1>
        </MediaQuery>
        <div className="info">
          <p>
            por <span>{post.user.name}</span> {post.fromNow}
          </p>
          <p>
            <FiClock /> {post.readingTime}
          </p>
        </div>
        <img src={post.file.url} alt="Imagem do post" />
        <Content>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </Content>
      </Fragment>
    );

    return (
      <Container>
        {loading ? (
          <Loading>
            <FaCircleNotch className="icon-spin" />
          </Loading>
        ) : (
          <Detalhes />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  blog: state.blog
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...MenuActions, ...BlogActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail);