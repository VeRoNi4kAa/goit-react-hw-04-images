import React, { Component } from 'react';

import axios from 'axios';

import SearchBar from './Searchbar/Searchbar';

import ImageGallery from './ImageGallery/ImageGallery';

import Button from './Button/Button';

import Loader from './Loader/Loader';

import Modal from './Modal';

const PIXABAY_KEY = '24537625-47620fa03ad46ed0668a7b060';

class App extends Component {
  state = {
    value: '',
    images: [],
    page: 1,
    stateMashine: 'idle',
    showModal: false,
    largeImage: '',
    totalPages: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prewValue = prevState.value;
    const newValue = this.state.value;
    const prewPage = prevState.page;
    const newPage = this.state.page;

    if (prewValue !== newValue || prewPage !== newPage) {
      this.setState({ stateMashine: 'loading' });
      axios
        .get(
          `https://pixabay.com/api/?q=${newValue.value}&page=${newPage}&key=${PIXABAY_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        )
        .catch(error => console.log('Error', error.message))
        .then(responce => {
          const images = responce.data.hits;
          this.setState(prewState => ({
            images: [...prewState.images, ...images],
          }));
          this.setState(prewState => ({
            totalPages: responce.data.totalHits / 12,
          }));
        })
        .finally(() => this.setState({ stateMashine: 'loaded' }));
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  addPage = page => {
    this.setState({ page: this.state.page + 1 });
  };

  addToState = value => {
    this.setState({ value: value, page: 1, images: [] });
  };

  addLargeImg = e => {
    this.setState({ largeImage: e.target.getAttribute('id') });
    this.toggleModal();
  };

  render() {
    const { addToState, addPage, toggleModal, addLargeImg } = this;
    const { images, stateMashine, showModal, largeImage, totalPages, page } =
      this.state;
    return (
      <div className="App">
        <SearchBar onSubmit={value => addToState(value)} />
        {!!images.length && stateMashine === 'loaded' ? (
           <ImageGallery images={images} onClick={addLargeImg} />
        ) : (
          <p className="error">not found</p>
        )}
        {stateMashine === 'loading' && <Loader></Loader>}
        {images.length > 0 && page <= totalPages && (
          <Button onClick={addPage} />
        )}
        {showModal && <Modal onClose={toggleModal} largeImage={largeImage} />}
      </div>
    );
  }
}

export default App;
