import React from 'react';
import { StyleSheet,
  TextInput,
   Alert,
   Text, 
   View, 
   ScrollView,
   Button,
   Modal,
   Image,
   TouchableHighlight,
   Picker } from 'react-native';
import { LinearGradient } from 'expo';
import { TextInputMask } from 'react-native-masked-text'
import ModalDropdown from 'react-native-modal-dropdown';
import ListaDeSelecao from './componentes/ListaSelecao';


//import console = require('console');
class HomeActivity extends React.Component {

  constructor(){
     super();
     this.state={
       PickerSelectedVal : ''
     }
   }

   getSelectedPickerValue=()=>{
      Alert.alert("Selected country is : " +this.state.PickerSelectedVal);
    }


  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: "center",
        margin :30
      }}>
      <Picker
           selectedValue={this.state.PickerSelectedVal}
           onValueChange={(itemValue, itemIndex) => this.setState({PickerSelectedVal: itemValue})} >

           <Picker.Item label="India" value="India" />
           <Picker.Item label="USA" value="USA" />
           <Picker.Item label="China" value="China" />
           <Picker.Item label="Russia" value="Russia" />
           <Picker.Item label="United Kingdom" value="United Kingdom" />
           <Picker.Item label="France" value="France" />

         </Picker>

         <Button title="Get Selected Picker Value" onPress={ this.getSelectedPickerValue } />
      </View>
    );
  }
  
}


class Lancamento extends React.Component {
  
  constructor(props) {
    super(props);

    this.inputRefs = {
        firstTextInput: null,
        favSport0: null,
        favSport1: null,
        lastTextInput: null,
    };

    this.state = {
      cpf: '0,0'
    }

  }

  

  render() {

      const { aberto, fecharModal } = this.props;

      return(
          <Modal
              animationType="slide"
              transparent={false}
              visible={aberto}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
                  <View style={{paddingTop:20}}>
                    <Text>Modal aberto</Text>
                    <TouchableHighlight
                        onPress={() => {
                          fecharModal();
                        }}>
                        <Text>Fechar modal</Text>
                    </TouchableHighlight>
                  </View>
                  <View style={styles.container}>
                      <View style={styles.SectionStyle}>
                        <Image source={require('./assets/moneyIcon.png')} style={styles.ImageStyle} />
                            <TextInputMask
                              type={'money'}
                              options={{
                                precision: 2,
                                separator: ',',
                                delimiter: '.',
                                unit: 'R$',
                                suffixUnit: ''
                              }}
                              value={this.state.cpf}
                              onChangeText={text => {
                                this.setState({
                                  cpf: text
                                })
                              }}
                              style={{height: 50,
                                borderRadius:10,
                                width: "90%",}}
                            />
                      </View>
                      
                      <View style={styles.SectionStyle}>
                        <Image source={require('./assets/moneyIcon.png')} style={styles.ImageStyle} />
                        <TextInput
                              style={{height: 40, width:100, borderColor: 'gray', borderWidth: 1}}
                              onChangeText={(text) => this.setState({text})}
                              value={this.state.text}
                            />
                      </View>

                      <View style={styles.SectionStyle}>
                        <Image source={require('./assets/moneyIcon.png')} style={styles.ImageStyle} />
                        <ModalDropdown options={['option 1', 'option 2']}/>
                      </View>

                      

                      </View>
                 

              </Modal>

      )
  }
}


const Header = () => {
  return(
    <View style={{width:"100%"}}>
      <LinearGradient
          colors={['#3cbc9e', '#135138']}
          style={{height:200, padding: 15, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize:30, fontWeight:"bold", color:"#ffffff"}}>R$ 4.500,00</Text>
            <Text style={{fontSize:15, fontWeight:"bold", color:"#ffffff"}}>Saldo em contas</Text>
      </LinearGradient>
      </View>
  )
}

export default class App extends React.Component {
  
  state = {
    aberto: false
  }

  lancarDespesa = () => {
    this.abrirModal()
  }

  fecharModal = () => {
    this.setState({aberto:false})
  }
  
  abrirModal = () => {
    this.setState({aberto:true})
  }

  render() {
    return (
      <View style={{backgroundColor:"#d2d6d8", flex:1}}>
        
        <Lancamento 
          aberto={this.state.aberto}
          fecharModal={this.fecharModal}
        />

        <Header/>
        <View style={{position:"relative", top: -20, width: "100%"}} >
          <View style={[styles.boxComSombra, styles.sombra]}>
              <Text>VISAO GERAL</Text>
              <View style={styles.boxReceitaDespesa}>
                <View style={{width: 8, height: 8, backgroundColor: 'blue',borderRadius:100,marginRight:6, marginTop:4}} ></View>
                <View style={{width: 200}}><Text>Total de receitas</Text></View>
                <View style={{width: 113, alignItems: 'flex-end'}}><Text style={{color:"blue"}}>R$ 4.500,00</Text></View>
             </View>
             <View style={styles.boxReceitaDespesa}>
                <View style={{width: 8, height: 8, backgroundColor: 'red',borderRadius:100,marginRight:6, marginTop:4}} ></View>
                <View style={{width: 200}}><Text>Total de despesas</Text></View>
                <View style={{width: 113, alignItems: 'flex-end'}}><Text style={{color:"red"}}>R$ 2.040,00</Text></View>
             </View>
            
          </View>
        </View>
        
        <ListaDeSelecao />
        
        <View style={{width: '100%', 
              height: 50, 
              backgroundColor: '#FF9800', 
              justifyContent: 'center', 
              alignItems: 'center',
              position: 'absolute',
              bottom: 0}}>
                <Button
                    onPress={this.lancarDespesa}
                    title="Lancar despesa"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                  />
              </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  sombra : {
      shadowColor: "#000",
      shadowOffset: {width: 0,height: 2,},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,

  },

  boxComSombra : {
      marginLeft:12, 
      marginRight:12, 
      borderRadius:10, 
      height:100, 
      padding:15,
      backgroundColor:"#ffffff",       
  },

  boxReceitaDespesa:{
    flex:1,
    flexDirection:"row",
    marginTop:12},
  

  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5 ,
    margin: 10
},

ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode : 'stretch',
    alignItems: 'center'
},

container: {
  flex: 1,
  alignItems: 'center',
  margin: 10
},

});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      //borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      //borderColor: 'eggplant',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
  },
});
