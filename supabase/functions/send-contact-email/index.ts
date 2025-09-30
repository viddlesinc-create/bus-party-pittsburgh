import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfRide: string;
  pickupCity: string;
  dropoffCity: string;
  partySize: string;
  pickupTime?: string;
  dropoffTime?: string;
  source: 'homepage' | 'contact';
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  try {
    const formData: ContactFormData = await req.json();
    
    console.log("Received form data:", formData);

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'dateOfRide', 'pickupCity', 'dropoffCity', 'partySize'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof ContactFormData]);
    
    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ error: `Missing required fields: ${missingFields.join(', ')}` }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Create email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #e91e63; padding-bottom: 10px;">
          New Quote Request from ${formData.source === 'homepage' ? 'Homepage' : 'Contact Page'}
        </h2>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Customer Information</h3>
          <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
        </div>
        
        <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Ride Details</h3>
          <p><strong>Date of Ride:</strong> ${formData.dateOfRide}</p>
          <p><strong>Pickup Location:</strong> ${formData.pickupCity}</p>
          <p><strong>Drop-off Location:</strong> ${formData.dropoffCity}</p>
          <p><strong>Party Size:</strong> ${formData.partySize} passengers</p>
          ${formData.pickupTime ? `<p><strong>Pickup Time:</strong> ${formData.pickupTime}</p>` : ''}
          ${formData.dropoffTime ? `<p><strong>Drop-off Time:</strong> ${formData.dropoffTime}</p>` : ''}
        </div>
        
        <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #856404;"><strong>Action Required:</strong> Please follow up with this customer within 2 hours to provide a quote and confirm availability.</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          This email was sent from the Pitt Party Bus website contact form.<br>
          Form submitted on: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST
        </p>
      </div>
    `;

    // Send email using Resend API directly
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY environment variable is not set");
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Pitt Party Bus <quotes@pittpartybus.com>",
        to: ["info@localmotive.co"],
        bcc: ["pittpartybus412@gmail.com", "info@redcarpet.limo"],
        subject: `New Quote Request - ${formData.firstName} ${formData.lastName} - ${formData.dateOfRide}`,
        html: emailHtml,
        reply_to: formData.email,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Resend API error:", errorText);
      throw new Error(`Email service error: ${emailResponse.status} - ${errorText}`);
    }

    const emailResult = await emailResponse.json();
    console.log("Email sent successfully:", emailResult);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Quote request submitted successfully! We'll contact you within 2 hours.",
        emailId: emailResult.id 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to submit quote request. Please try again or call us directly.",
        details: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);