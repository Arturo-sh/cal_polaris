const MAX_HRS_EXTRA_DOBLES = 9;
const SALARIO_INICIAL = 351.86

var salarioDiario = 404.64;
var horasExtra = 24;
var primaDominical = true;

calcularSalario();

function calcularSalario() {
  pagoPrimaDominical = 0;
  if (salarioDiario == 0 || isNaN(salarioDiario)) salarioDiario = SALARIO_INICIAL;

  sueldoOrdinario = salarioDiario * 6;
  septimoDia = salarioDiario;
 
  TE = calcularHorasExtra(salarioDiario, horasExtra);
  // sueldoHora = TE.sueldoHora;
  pagoDobleExtras = TE.pagoDoble;
  pagoTripleExtras = TE.pagoTriple;
  pagoTotalExtras = TE.pagoHorasExtra;

  DT = calcularDiaDescansoTrabajado(salarioDiario, horasExtra);
  // sueldoHora = DT.sueldoHora;
  pagoDobleDescansoTrabajado = DT.pagoDoble;
  pagoTripleDescansoTrabajado = DT.pagoTriple;
  pagoDescansoTrabajado = DT.pagoDescansoTrabajado;
  
  if (primaDominical) pagoPrimaDominical = salarioDiario * .375;
  pagoPuntualidad = 125;
  pagoAsistencia = 125;
  // valeDespensa = ((sueldoOrdinario + septimoDia / 100)) * 10.5;
  valeDespensa = (sueldoOrdinario + septimoDia) * .105;
  bonoVale = ((sueldoOrdinario + septimoDia) * 4) * .06;
  totalValesMensual = (valeDespensa * 4) + bonoVale;
  // fondoAhorro = ((sueldoOrdinario + septimoDia) / 100) * 9;
  fondoAhorro = (sueldoOrdinario + septimoDia) * .09;
  pagoCuotaSindical = salarioDiario * .07;

  // sueldoSemanalADI = sueldoOrdinario + septimoDia + pagoPuntualidad + pagoAsistencia + pagoTotalExtras;
  sueldoSemanalADI = sueldoOrdinario + septimoDia + pagoPuntualidad + pagoAsistencia + pagoPrimaDominical + pagoDescansoTrabajado;

  pagoISR = calcularISR(sueldoSemanalADI);
  sueldoNetoAproximado = sueldoSemanalADI - pagoISR - fondoAhorro - pagoCuotaSindical;
  
  console.log("sueldo_ordinario: " + sueldoOrdinario.toFixed(2));
  console.log("septimo_dia: " + septimoDia.toFixed(2));
  console.log("pago_doble_extra: " + pagoDobleDescansoTrabajado.toFixed(2));
  console.log("pago_triple_extra: " + pagoTripleDescansoTrabajado.toFixed(2));
  console.log("pago_horas_extra: " + pagoDescansoTrabajado.toFixed(2));
  console.log("pago_prima_dominical: " + pagoPrimaDominical.toFixed(2));
  console.log("pago_puntualidad: " + pagoPuntualidad.toFixed(2));
  console.log("pago_asistencia: " + pagoAsistencia.toFixed(2));
  console.log("vale_despensa: " + valeDespensa.toFixed(2));
  console.log("bono_vale: " + bonoVale.toFixed(2));
  console.log("total_vales_mensual: " + totalValesMensual.toFixed(2));
  console.log("fondo_ahorro: " + fondoAhorro.toFixed(2));
  console.log("pago_semanal_adi: " + sueldoSemanalADI.toFixed(2));
  console.log("pago_isr: " + pagoISR.toFixed(2));
  console.log("pago_cuota_sindical: " + pagoCuotaSindical.toFixed(2));
  console.log("sueldo_neto_aproximado: " + sueldoNetoAproximado.toFixed(2));

  console.log("pago_doble_extra [TE]: " + pagoDobleExtras.toFixed(2));
  console.log("pago_triple_extra [TE]: " + pagoTripleExtras.toFixed(2));
  console.log("pago_total_extra [TE]: " + pagoTotalExtras.toFixed(2));
}

 function calcularISR(sueldoSemanalADI) {
   tarifasISR = [
    {
      'limite_inferior': 0.01,
      'limite_superior': 194.46,
      'cuota_fija': 0.00,
      'porcentaje': 1.92
    },
    {
      'limite_inferior': 194.47,
      'limite_superior': 1650.67,
      'cuota_fija': 3.71,
      'porcentaje': 6.40
    },
    {
      'limite_inferior': 1650.68,
      'limite_superior': 2900.87,
      'cuota_fija': 96.95,
      'porcentaje': 10.88
    },
    {
      'limite_inferior': 2900.88,
      'limite_superior': 3372.11,
      'cuota_fija': 232.96,
      'porcentaje': 16.00
    },
    {
      'limite_inferior': 3372.12,
      'limite_superior': 4037.32,
      'cuota_fija': 308.35,
      'porcentaje': 17.92
    },
    {
      'limite_inferior': 4037.33,
      'limite_superior': 8142.75,
      'cuota_fija': 427.56,
      'porcentaje': 21.36
    },
    {
      'limite_inferior': 8142.76,
      'limite_superior': 12834.08,
      'cuota_fija': 1304.45,
      'porcentaje': 23.52
    },
    {
      'limite_inferior': 12834.09,
      'limite_superior': 24502.45,
      'cuota_fija': 2407.86,
      'porcentaje': 30.00
    },
    {
      'limite_inferior': 24502.46,
      'limite_superior': 32669.91,
      'cuota_fija': 5908.35,
      'porcentaje': 32.00
    },
    {
      'limite_inferior': 32669.92,
      'limite_superior': 98009.66,
      'cuota_fija': 8521.94,
      'porcentaje': 34.00
    },
    {
      'limite_inferior': 98009.67,
      'limite_superior': 1000000,
      'cuota_fija': 30737.49,
      'porcentaje': 35.00
    }
  ];
      
   /*
    * La fórmula para calcular el Impuesto Sobre la Renta (ISR) mensual en 
    * México (2026) se basa en un sistema progresivo: 
    * (Ingreso Gravable - Límite Inferior) % sobre excedente + Cuota Fija. 
    * Se utilizan tablas publicadas por el SAT que ajustan el porcentaje 
    * según el nivel de ingresos.
   */

   for (let index = 0; index < tarifasISR.length; index++) {
    const limiteInferior = tarifasISR[index].limite_inferior;
    const limiteSuperior = tarifasISR[index].limite_superior;

    if (sueldoSemanalADI >= limiteInferior && sueldoSemanalADI <= limiteSuperior) {
      const cuotaFija = tarifasISR[index].cuota_fija;
      const porcentaje = tarifasISR[index].porcentaje;

      totalISR = ((sueldoSemanalADI - limiteInferior) / 100) * porcentaje + cuotaFija;
    }
   }

   return totalISR;
 }

 function calcularHorasExtra(salarioDiario, horasExtra) {
  sueldoHora = salarioDiario / 8;
  pagoDoble = 0;
  pagoTriple = 0;
  pagoHorasExtra = 0;

  if (horasExtra > 0) {
    if (horasExtra <= MAX_HRS_EXTRA_DOBLES) {
      pagoDoble = sueldoHora * 2 * horasExtra;
    } else {
      pagoDoble = sueldoHora * 2 * MAX_HRS_EXTRA_DOBLES;
      horas_triples = horasExtra - MAX_HRS_EXTRA_DOBLES;
      pagoTriple = sueldoHora * 3 * horas_triples;
    }

    pagoHorasExtra = pagoDoble + pagoTriple;
  }

  datosTiempoExtra = {
    'sueldoHora': sueldoHora,
    'pagoDoble': pagoDoble,
    'pagoTriple': pagoTriple,
    'pagoHorasExtra': pagoHorasExtra
  };

  return datosTiempoExtra;
}

function calcularDiaDescansoTrabajado(salarioDiario, horasLaboradas) {
  sueldoHora = salarioDiario / 8;
  pagoDoble = 0;
  pagoTriple = 0;
  pagoDescansoTrabajado = 0;

  while (horasLaboradas > 0) {
    if (horasLaboradas >= 12) {
      pagoDoble += sueldoHora * 2 * MAX_HRS_EXTRA_DOBLES;
      horas_triples = 12 - MAX_HRS_EXTRA_DOBLES;
      pagoTriple += sueldoHora * 3 * horas_triples;
      horasLaboradas -= 12;
    }

    if (horasLaboradas > MAX_HRS_EXTRA_DOBLES && horasLaboradas < 12) {
      pagoDoble += sueldoHora * 2 * MAX_HRS_EXTRA_DOBLES;
      horas_triples = horasLaboradas - MAX_HRS_EXTRA_DOBLES;
      pagoTriple += sueldoHora * 3 * horas_triples;
      horasLaboradas -= horasLaboradas;
    }

    if (horasLaboradas > 0 && horasLaboradas <= MAX_HRS_EXTRA_DOBLES) { 
      pagoDoble += sueldoHora * 2 * horasLaboradas;
      horasLaboradas -= horasLaboradas;
    }
  }

  pagoDescansoTrabajado = (pagoDoble + pagoTriple);
  
  datosDescansoTrabajado = {
    'sueldoHora': sueldoHora,
    'pagoDoble': pagoDoble,
    'pagoTriple': pagoTriple,
    'pagoDescansoTrabajado': pagoDescansoTrabajado
  }

  return datosDescansoTrabajado;
}
