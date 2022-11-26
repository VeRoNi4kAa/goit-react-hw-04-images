import React, { useState, useEffect } from 'react';

import SearchBar from './Searchbar/Searchbar';

import ImageGallery from './ImageGallery/ImageGallery';

import Button from './Button/Button';

import Loader from './Loader/Loader';

import Modal from './Modal';

import { fetchImages } from '../api/api';

function App() {
  const [value, setValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [stateMashine, setStateMashine] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [totalPages, setTotalPages] = useState('');

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const addPage = page => {
    setPage(page => page + 1);
  };

  const addToState = value => {
    setValue(value);
    setPage(1);
    setImages([]);
  };

  const addLargeImg = e => {
    setLargeImage(e.target.getAttribute('id'));
    toggleModal();
  };

  useEffect(() => {
    if (value === '') {
      return;
    }
    setStateMashine('loading');

    fetchImages(value, page)
      .then(responce => {
        const images = responce.data.hits;
        setImages(prewImages => [...prewImages, ...images]);
        setTotalPages(responce.data.totalHits / 12);
      })
      .finally(() => setStateMashine('loaded'));
  }, [value, page]);

  return (
    <div className="App">
      <SearchBar onSubmit={value => addToState(value)} />
      {!!images.length && stateMashine === 'loaded' ? (
        <ImageGallery images={images} onClick={addLargeImg} />
      ) : (
        <p className="error">not found</p>
      )}
      {stateMashine === 'loading' && <Loader></Loader>}
      {images.length > 0 && page <= totalPages && <Button onClick={addPage} />}
      {showModal && <Modal onClose={toggleModal} largeImage={largeImage} />}
    </div>
  );
}

export default App;
