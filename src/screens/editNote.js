import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import CustomButton from '../components/customButton'
import CustomTextInput from '../components/customTextInput'

const EditNote = ({ setCurrentPage, selectedNoteId, noteList, editNote }) => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
        
    useEffect(() => {
      const selectedNote = noteList.find((note) => note.id === selectedNoteId);
      if (selectedNote) {
        setTitle(selectedNote.title);
        setDesc(selectedNote.desc);
      }
    }, [noteList, selectedNoteId]);
  

    const saveNote = () => {
      // Cari catatan yang sesuai dalam noteList berdasarkan selectedNoteId
      const selectedNote = noteList.find((note) => note.id === selectedNoteId);
      if (selectedNote) {
        // Jika catatan ditemukan, perbarui title dan desc
        const updatedNote = {
          ...selectedNote,
          title: title,
          desc: desc,
        };
        // Panggil fungsi editNote dengan catatan yang diperbarui
        editNote(updatedNote);
      }
      // Kembali ke halaman home
      setCurrentPage('home');
    };

    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>{title}</Text>
        <CustomTextInput
          text={title}
          onChange={setTitle}
          label= {"Judul"}
          placeholder="Judul"
          numberOfLines={1}
          multiline={false}
        />
        <CustomTextInput
          text={desc}
          onChange={setDesc}
          label="Deskripsi"
          placeholder="Deskripsi"
          multiline
          numberOfLines={4}
        />
        <View style={styles.spacerTop}>
          <CustomButton
            backgroundColor="#247881"
            color="#fff"
            text="Simpan"
            width="100%"
            onPress={() => {
              saveNote()
              setCurrentPage('home')
            }}
          />
        </View>
        <View style={styles.spacerTop}>
          <CustomButton
            backgroundColor="#DDDDDD"
            color="#203239"
            text="Kembali ke Home"
            width="100%"
            onPress={() => {
              setCurrentPage('home')
            }}
          />
        </View>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 20,
    },
    pageTitle: {
      marginTop: 20,
      fontSize: 20,
      fontWeight: '700',
      textAlign: 'center',
      color: '#203239',
    },
    spacerTop: {
      marginTop: 30,
    },
  })
  
  export default EditNote