import { NextRequest, NextResponse } from "next/server";

/*
  ─────────────────────────────────────────────────────────────
  RUTA: POST /api/payment
  ─────────────────────────────────────────────────────────────
  Recibe el token de Culqi desde el frontend y procesa el cobro
  usando la Secret Key de Culqi (NUNCA exponer en el frontend).

  SETUP:
  1. En tu panel Culqi obtén tus llaves en: https://culqi.com
  2. Agrega en .env.local:
       CULQI_SECRET_KEY=sk_live_XXXXXXXXXXXXXXXX
       NEXT_PUBLIC_CULQI_PUBLIC_KEY=pk_live_XXXXXXXXXXXXXXXX

  Culqi API docs: https://apidocs.culqi.com
  ───────────────────────────────────────────────────────────── */

const CULQI_SECRET_KEY = process.env.CULQI_SECRET_KEY ?? "";

export async function POST(req: NextRequest) {
  try {
    const { token, amount, email, shipping } = await req.json();

    if (!token || !amount || !email) {
      return NextResponse.json({ success: false, message: "Datos incompletos." }, { status: 400 });
    }

    if (!CULQI_SECRET_KEY) {
      console.error("CULQI_SECRET_KEY no configurada en .env.local");
      return NextResponse.json(
        { success: false, message: "Error de configuración del servidor." },
        { status: 500 }
      );
    }

    /* ── Crear el cobro en Culqi ───────────────────────────── */
    const response = await fetch("https://api.culqi.com/v2/charges", {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${CULQI_SECRET_KEY}`,
      },
      body: JSON.stringify({
        amount,                        // en céntimos (ej: 3500 = S/ 35.00)
        currency_code: "PEN",
        email,
        source_id:     token,
        description:   "Pedido 3Dev",
        metadata: {
          nombre:    `${shipping.firstName} ${shipping.lastName}`,
          telefono:  shipping.phone,
          direccion: `${shipping.address}, ${shipping.district}, ${shipping.city}`,
        },
      }),
    });

    const culqiData = await response.json();

    if (culqiData.object === "error") {
      return NextResponse.json(
        { success: false, message: culqiData.user_message ?? "Pago rechazado." },
        { status: 402 }
      );
    }

    /* ── Aquí puedes guardar el pedido en tu base de datos ─── */
    // await db.orders.create({ chargeId: culqiData.id, amount, email, shipping, ... });

    return NextResponse.json({ success: true, chargeId: culqiData.id });

  } catch (err) {
    console.error("Error en /api/payment:", err);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
