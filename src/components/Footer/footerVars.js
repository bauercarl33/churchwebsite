import { FaPhoneAlt, FaFax, FaFacebook, FaInstagram, FaEnvelope, FaTruck } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'

export const footerLinks = {
    churchLocation: {
        link: 'https://www.google.com/maps/search/13740+Research+Boulevard,+1+Lake+Creek+Office+Park+Suite+W,+Austin,+TX+78759/@30.4591469,-97.7973402,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D',
        label: 'Map of church location',
        icon: <FaLocationDot size={24} className='icon' />,
        bold: 'bold',
        boldContent: "NEW Temporary Address:",
        content: "13740 Research Boulevard, 1 Lake Creek Office Park Suite W, Austin, TX 78759"
    },
    truckParking: {
        link: 'https://www.google.com/maps/place/11111+Lakeline+Blvd,+Austin,+TX+78717/@30.4788245,-97.798764,17z/data=!3m1!4b1!4m6!3m5!1s0x865b32a7ff7d7151:0x773487c9ebcceaee!8m2!3d30.4788245!4d-97.7961891!16s%2Fg%2F11bw435mbp?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D',
        label: 'Map of semi-truck parking',
        icon: <FaTruck size={24} className='icon' />,
        bold: 'bold',
        boldContent: "Semi-truck parking:",
        content: "11111 Lakeline Blvd, Austin, TX 78717"
    },
    phone: {
        link: 'tel: 7374004458',
        label: 'Call us',
        icon: <FaPhoneAlt size={24} className='icon' />,
        bold: 'no-bold',
        boldContent: "",
        content: "(737) 400-4458"
    },
    mail: {
        link: 'mailto: church@saintmaryaustin.org',
        label: 'Call us',
        icon: <FaEnvelope size={24} className='icon' />,
        bold: 'no-bold',
        boldContent: "",
        content: "church@saintmaryaustin.org"
    },
}

export const pageLinks = {
    home: {
        name: 'Home',
        link: '/',
        label: 'Go to home page'
    },
    about: {
        name: 'About',
        link: '/about',
        label: 'Go to about page'
    },
    calendar: {
        name: 'Calendar',
        link: '/calendar',
        label: 'Go to calendar page'
    },
}

export const socialLinks = {
    facebook: {
        link: 'https://www.facebook.com/saintmaryaustin/',
        icon: <FaFacebook size={32} className='icon'/>,
        label: "Go to Facebook page"
    },
    instagram: {
        link: 'https://www.instagram.com/saintmaryaustin/',
        icon: <FaInstagram size={32} className='icon'/>,
        label: "Go to Instagram page"
    }
}