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
import ListaDeSelecao from "./componentes/ListaSelecao";
import Lancamento from "./componentes/Lancamento";
import ExtratoLancamento from "./componentes/ExtratoLancamentos";
import { formatMoney } from "./componentes/Utils";

const Header = ({ saldo }) => {
  return (
    <View style={{ width: "100%" }}>
      <LinearGradient
        colors={["#3cbc9e", "#135138"]}
        style={{
          height: 200,
          padding: 15,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "#ffffff" }}>
          {"R$ "}{formatMoney(saldo)}
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold", color: "#ffffff" }}>
          Saldo em contas
        </Text>
      </LinearGradient>
    </View>
  );
};

export default class App extends React.Component {
  state = {
    modalDespesaAberto: false,
    lancamentos: [],
    tipoLancamento: ""
  };

  atualizarSaldoEmConta = () => {
    const { lancamentos } = this.state;

    let totalReceita = 0;
    let totalDespesas = 0;
    for (var i = 0; i < lancamentos.length; i++) {
      if (lancamentos[i].tipoLancamento === "DESPESA") {
        totalDespesas += lancamentos[i].valorFloat;
      } else {
        totalReceita += lancamentos[i].valorFloat;
      }
    }

    const saldo = totalReceita - totalDespesas;
    this.setState({ saldo, totalDespesas, totalReceita });
  };

  receberLancamento = lancamento => {
    this.state.lancamentos.push(lancamento);
    const lancamentos = this.state.lancamentos;
    this.setState({ lancamentos });
    this.atualizarSaldoEmConta();
  };

  fecharModalDespesa = () => {
    this.setState({ modalDespesaAberto: false });
  };

  abrirModal = () => {
    this.setState({ aberto: true });
  };

  selecionarItem = item => {
    this.setState({ aberto: false });
    console.log(item);
  };

  render() {
    return (
      <View style={{ backgroundColor: "#d2d6d8", flex: 1 }}>
        <Header saldo={this.state.saldo} />
        <View style={{ position: "relative", top: -20, width: "100%" }}>
          <View style={[styles.boxComSombra, styles.sombra]}>
            <Text>VISAO GERAL</Text>
            <View style={styles.boxReceitaDespesa}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: "blue",
                  borderRadius: 100,
                  marginRight: 6,
                  marginTop: 4
                }}
              />
              <View style={{ width: 200 }}>
                <Text>Total de receitas</Text>
              </View>
              <View style={{ width: 113, alignItems: "flex-end" }}>
                <Text style={{ color: "blue" }}>{"R$ "}{formatMoney(this.state.totalReceita)}</Text>
              </View>
            </View>
            <View style={styles.boxReceitaDespesa}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: "red",
                  borderRadius: 100,
                  marginRight: 6,
                  marginTop: 4
                }}
              />
              <View style={{ width: 200 }}>
                <Text>Total de despesas</Text>
              </View>
              <View style={{ width: 113, alignItems: "flex-end" }}>
                <Text style={{ color: "red" }}>{"R$ "}{formatMoney(this.state.totalDespesas)}</Text>
              </View>
            </View>
          </View>
        </View>

        <ExtratoLancamento lancamentos={this.state.lancamentos} />

        <View
          style={{
            width: "100%",
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            flexDirection: "row",
            bottom: 0
          }}
        >
          <TouchableOpacity
            onPress={() => {
              const tipoLancamento = "DESPESA";
              const modalDespesaAberto = true;

              this.setState({ modalDespesaAberto, tipoLancamento });
            }}
            style={{ marginRight: 10 }}
          >
            <LinearGradient
              colors={["#f2412e", "#bf2918"]}
              style={{
                backgroundColor: "red",
                borderRadius: 100,
                padding: 5
              }}
            >
              <Image
                source={require("./assets/iconMoneyDow.png")}
                style={styles.ImageStyleIcon}
              />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const tipoLancamento = "RECEITA";
              const modalDespesaAberto = true;

              this.setState({ modalDespesaAberto, tipoLancamento });
            }}
          >
            <LinearGradient
              colors={["#3cbc9e", "#135138"]}
              style={{
                backgroundColor: "red",
                borderRadius: 100,
                padding: 5
              }}
            >
              <Image
                source={require("./assets/iconMoneyUp.png")}
                style={styles.ImageStyleIcon}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Lancamento
          aberto={this.state.modalDespesaAberto}
          fecharModal={this.fecharModalDespesa}
          receberLancamento={this.receberLancamento}
          tipoLancamento={this.state.tipoLancamento}
        />
      </View>
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
    backgroundColor: "#ffffff",
    borderRadius: 10,
    height: 100,
    padding: 15
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

  ImageStyleIcon: {
    padding: 10,
    margin: 5,
    height: 40,
    width: 40,
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
