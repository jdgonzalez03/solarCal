export function corrienteCortoCircuitoControlador(corriente, cantidadModulos) {
  return corriente * cantidadModulos * 1.25;
}

export function maximaCorrienteCarga(potencia, voltaje) {
  return potencia / voltaje;
}
