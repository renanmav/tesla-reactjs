import React, { Component } from "react";

import { Container } from "./styles";
import { FaCircleNotch } from "react-icons/fa";
import "~/styles/loading.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as BlogActions } from "~/store/ducks/blog";

const instrucoes =
  "Para a correta estilização dos posts, você vai precisar saber o mínimo de HTML. \nTente utilizar, no conteúdo, componentes como:" +
  "\n<p>TEXTO</p> para parágrafos" +
  "\n<strong>NEGRITO</strong> para texto em negrito" +
  "\n<h2>TÍTULO</h2> para títulos de seções" +
  "\n<h4>SUB-TÍTULO</h4> para sub-títulos de seções" +
  "\n<ol><li>ITEM 1</li><li>ITEM 2</li></ol> para listas numeradas" +
  "\n<ul><li>ITEM 1</li><li>ITEM 2</li></ul> para listas não numeradas" +
  "\n<blockquote>CITAÇÃO</blockquote> para citações" +
  "\n<img src='LINK' alt='DESCRIÇÃO DA IMAGEM' /> para imagens durante o fluxo do post";

class CriarPost extends Component {
  state = {
    title: "",
    content: "",
    file_id: null
  };

  handleSubmitPost = e => {
    e.preventDefault();
    const { title, content, file_id } = this.state;
    this.props.createRequest({
      title,
      content,
      file_id
    });
  };

  render() {
    const { loading } = this.props.blog;

    return (
      <Container>
        <form onSubmit={this.handleSubmitPost}>
          <input
            type="text"
            placeholder="Título"
            value={this.state.titulo}
            onChange={e => this.setState({ title: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="ID da imagem principal"
            value={this.state.file_id}
            onChange={e => this.setState({ file_id: e.target.value })}
            required
          />
          <textarea
            placeholder="Conteúdo"
            value={this.state.content}
            onChange={e => this.setState({ content: e.target.value })}
            required
          />
          <button type="submit">
            {loading ? <FaCircleNotch className="icon-spin" /> : "Entrar"}
          </button>
          <pre>{instrucoes}</pre>
        </form>
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  blog: state.blog
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(BlogActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CriarPost);