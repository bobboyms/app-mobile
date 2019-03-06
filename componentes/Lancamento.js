import React from "react";
import {
  StyleSheet,
  TextInput,
  Alert,
  Text,
  View,
  ScrollView,
  Button,
  Modal,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Picker
} from "react-native";
import { LinearGradient } from "expo";
import { TextInputMask } from "react-native-masked-text";
import DateTimePicker from "react-native-modal-datetime-picker";
import ListaDeSelecao from "../componentes/ListaSelecao";

export default class Lancamento extends React.Component {
  state = {
    dadosContasApagar: [
      {
        nome: "Educaçao",
        icone: require("../assets/iconEscola.png")
      },
      {
        nome: "Alimentaçao",
        icone: require("../assets/iconFood.png")
      },
      {
        nome: "Carro",
        icone: require("../assets/iconCarro.png")
      }
    ],

    dadosReceita: [
        {
          nome: "Salario",
          icone: require("../assets/iconEscola.png")
        },
        {
          nome: "Venda de serviço",
          icone: require("../assets/iconFood.png")
        },
        {
          nome: "Venda de ativo",
          icone: require("../assets/iconCarro.png")
        }
      ],

    dadosDaConta: [
      {
        nome: "Banco do Brasil",
        icone: require("../assets/iconMoney.png")
      },
      {
        nome: "Caixa",
        icone: require("../assets/iconMoney.png")
      }
    ],

    valor: "0,0",
    valorFloat: 0,

    ativoModalDespesa: false,
    despesa: {
      nome:"",
      icone: require("../assets/iconCarrinho.png")
    },

    ativoModalConta: false,
    conta: {
      nome: "Selecione uma conta",
      icone: require("../assets/iconCofre.png")
    },

    isDateTimePickerVisible: false,

    dataDaDespesa: { valor: "Selecione a data" }
  };


  validarDados = () => {
    if (this.state.valorFloat <= 0) {
      alert("Digite o valor");
      return false;
    }

    if (this.state.despesa.nome === "Selecione uma despesa") {
      alert("Selecione uma despesa");
      return false;
    }

    if (this.state.conta.nome === "Selecione uma conta") {
      alert("Selecione uma conta");
      return false;
    }

    if (this.state.dataDaDespesa.valor === "Selecione a data") {
      alert("Selecione a data do lançamento");
      return false;
    }

    return true;
  };

  resetarValores = () => {
    this.setState({
      valor: "0,0",
      valorFloat: 0,

      ativoModalDespesa: false,
      despesa: {
        nome: "Selecione uma despesa",
        icone: require("../assets/iconCarrinho.png")
      },

      ativoModalConta: false,
      conta: {
        nome: "Selecione uma conta",
        icone: require("../assets/iconCofre.png")
      },

      isDateTimePickerVisible: false,

      dataDaDespesa: { valor: "Selecione a data" }
    });
  };

  fecharModalDespesa = () => {
    this.setState({ ativoModalDespesa: false });
  };

  fecharModalConta = () => {
    this.setState({ ativoModalConta: false });
  };

  selecionarItemDespesa = item => {
    const ativoModalDespesa = false;
    const despesa = item;

    this.setState({ ativoModalDespesa, despesa });
  };

  selecionarItemConta = item => {
    const ativoModalConta = false;
    const conta = item;

    this.setState({ ativoModalConta, conta });
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    const dataDaDespesa = { valor: date.toLocaleString().split(" ")[0] };

    this.setState({ dataDaDespesa });
    this._hideDateTimePicker();
  };

  render() {

    const { aberto, fecharModal, receberLancamento, tipoLancamento } = this.props;


    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={aberto}
        onRequestClose={() => {
          alert("Modal has been closed.");
        }}

        onShow={() =>{
            const despesa = {
                icone: tipoLancamento === "DESPESA"? require("../assets/iconCarrinho.png") : require("../assets/iconMoney2.png"),
                nome : tipoLancamento === "DESPESA" ? "Selecione uma despesa" : "Selecione uma receita"
            }

            this.setState({despesa})
        }}
      >
        <View
          style={{
            paddingTop: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,
            elevation: 11
          }}
        />
        <View style={[styles.container, { backgroundColor: "#dee4ed" }]}>
          <Text style={{ marginTop: 20, fontWeight: "bold" }}>
            LANÇAR {this.props.tipoLancamento}
          </Text>
          <View style={styles.SectionStyle}>
            <Image
              source={require("../assets/moneyIcon.png")}
              style={styles.ImageStyle}
            />
            <TextInputMask
              type={"money"}
              options={{
                precision: 2,
                separator: ",",
                delimiter: ".",
                unit: "R$",
                suffixUnit: ""
              }}
              value={this.state.valor}
              onChangeText={text => {
                const valor = text;
                const valorFloat = parseFloat(
                  text
                    .replace("R$", "")
                    .replace(".", "")
                    .replace(",", ".")
                );
                this.setState({ valor, valorFloat });
              }}
              style={{
                height: 50,
                borderRadius: 10,
                width: "90%"
              }}
            />
          </View>

          <View style={styles.SectionStyle}>
            <Image
              source={this.state.despesa.icone}
              style={styles.ImageStyle}
            />
            <TouchableOpacity
              style={{
                height: 50,
                borderRadius: 10,
                marginTop: 33,
                width: "90%"
              }}
              onPress={() => {
                this.setState({ ativoModalDespesa: true });
              }}
            >
              <View>
                <Text>{this.state.despesa.nome}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.SectionStyle}>
            <Image source={this.state.conta.icone} style={styles.ImageStyle} />
            <TouchableOpacity
              style={{
                height: 50,
                borderRadius: 10,
                marginTop: 33,
                width: "90%"
              }}
              onPress={() => {
                this.setState({ ativoModalConta: true });
              }}
            >
              <View>
                <Text>{this.state.conta.nome}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.SectionStyle}>
            <Image
              source={require("../assets/iconCalendario.png")}
              style={styles.ImageStyle}
            />
            <TouchableOpacity
              style={{
                height: 50,
                borderRadius: 10,
                marginTop: 33,
                width: "90%"
              }}
              onPress={() => {
                this.setState({ isDateTimePickerVisible: true });
              }}
            >
              <View>
                <Text>{this.state.dataDaDespesa.valor}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.SectionStyle}>
            <Image
              source={require("../assets/iconNota.png")}
              style={styles.ImageStyle}
            />

            <TextInput
              style={{
                height: 40,
                borderRadius: 10,
                width: "90%"
              }}
              placeholder="Descreva a despesa"
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ descricao: text })}
            />
          </View>

          {/** **/}

          <TouchableHighlight
            onPress={() => {
              const lancamento = {
                tipoLancamento: this.props.tipoLancamento,
                descricao: this.state.descricao,
                valor: this.state.valor,
                valorFloat: this.state.valorFloat,
                despesa: this.state.despesa,
                conta: this.state.conta,
                dataDaDespesa: this.state.dataDaDespesa,
                usuario: { nome: "Thiago" }
              };

              if (this.validarDados()) {
                receberLancamento(lancamento);
                this.resetarValores();
                fecharModal();
              }
            }}
            style={{
              height: 50,
              width: "93%"
            }}
          >
            <LinearGradient
              colors={
                this.props.tipoLancamento === "DESPESA"
                  ? ["#ad1641", "#f44242"]
                  : ["#3cbc9e", "#135138"]
              }
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                borderRadius: 5
              }}
            >
              <Text>Fazer Lancamento</Text>
            </LinearGradient>
          </TouchableHighlight>

          <TouchableOpacity
            onPress={() => {
              this.resetarValores();
              fecharModal();
            }}
            style={{
              height: 50,
              width: "93%"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                borderRadius: 5
              }}
            >
              <Text>Cancelar</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        { this.props.tipoLancamento === "DESPESA" ?
        <ListaDeSelecao
          ativo={this.state.ativoModalDespesa}
          fecharModal={this.fecharModalDespesa}
          selecionarItem={this.selecionarItemDespesa}
          dados={this.state.dadosContasApagar}          
        />:
        <ListaDeSelecao
          ativo={this.state.ativoModalDespesa}
          fecharModal={this.fecharModalDespesa}
          selecionarItem={this.selecionarItemDespesa}
          dados={this.state.dadosReceita}
        />
        
        }


        
        <ListaDeSelecao
          ativo={this.state.ativoModalConta}
          fecharModal={this.fecharModalConta}
          selecionarItem={this.selecionarItemConta}
          dados={this.state.dadosDaConta}
        /> 

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  sombra: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  boxComSombra: {
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 10,
    height: 100,
    padding: 15,
    backgroundColor: "#ffffff"
  },

  boxReceitaDespesa: {
    flex: 1,
    flexDirection: "row",
    marginTop: 12
  },

  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 40,
    borderRadius: 5,
    margin: 10
  },

  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center"
  },

  container: {
    flex: 1,
    alignItems: "center",
    margin: 10
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    //borderColor: 'gray',
    borderRadius: 4,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    //borderColor: 'eggplant',
    borderRadius: 8,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});
