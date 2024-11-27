//Obtener potencia maxima que debe suministrar
export function getMaxPower(array) {
  if (!array || !Array.isArray(array) || array.length === 0) {
    console.warn("El array proporcionado no es válido o está vacío.");
    return 0;
  }

  let maxPower = 0;

  array.forEach((item) => {
    maxPower += item.potencia_total || 0;
  });
  return maxPower;
}

//Obtener energia maxima diaria
export function getMaxEnergyDaily(array) {
  if (!array || !Array.isArray(array) || array.length === 0) {
    console.warn("El array proporcionado no es válido o está vacío.");
    return 0;
  }

  let maxEnergy = 0;

  array.forEach((item) => {
    maxEnergy += item.energia || 0;
  });
  return maxEnergy;
}

//Obtener maxima corriente y energia real
export function getRealEnergyMax(energy, eficienciaInversor) {
  return energy / eficienciaInversor;
}

export function getMaxCurrent(realEnergy, tensionSistema, factorSeguridad) {
  return (realEnergy / tensionSistema) * factorSeguridad;
}

//Calculos paneles Solares
export function getPanelesParalelo(maxCurrent, HSP, nominalCurrentPanel) {
  return maxCurrent / (HSP * nominalCurrentPanel);
}

export function getPanelesSerie(voltajeSistema, voltajePanel) {
  return voltajeSistema / voltajePanel;
}

//Calculos baterias
export function getBateriasParalelo(
  maxCurrent,
  diasAutonomia,
  profundidadDescarga,
  capacidadBateria,
) {
  return (
    (maxCurrent * diasAutonomia) / (profundidadDescarga * capacidadBateria)
  );
}

export function getBateriasSerie(voltajeSistema, voltajeBateria) {
  return voltajeSistema / voltajeBateria;
}

//Seleccion de controlador
export function getMaxCurrentControlador(
  panelesParalelo,
  corrientCortoPanel,
  factorSeguridad,
) {
  return panelesParalelo * corrientCortoPanel * factorSeguridad;
}

//Seleccion de inversor
export function getMaxPowerInversor(
  maxPower,
  factorSeguridad,
  eficienciaInversor,
) {
  return (maxPower * factorSeguridad) / eficienciaInversor;
}
