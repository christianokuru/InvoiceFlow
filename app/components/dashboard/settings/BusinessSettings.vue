<template>
  <div class="space-y-8">
    <!-- Business Logo -->
    <div>
      <h3 class="text-lg font-medium text-gray-900 mb-4">Business Logo</h3>
      <div class="flex items-center space-x-6">
        <div class="shrink-0 relative">
          <div class="h-32 w-32 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
            <img
              v-if="form.logo"
              :src="form.logo"
              alt="Business Logo"
              class="h-full w-full object-cover"
            />
            <BuildingOfficeIcon v-else class="h-16 w-16 text-gray-400" />
          </div>
          <div v-if="uploadingLogo" class="absolute inset-0 bg-white bg-opacity-75 rounded-lg flex items-center justify-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        </div>
        <div class="flex-1">
          <input
            ref="logoInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleLogoChange"
          />
          <button
            type="button"
            :disabled="uploadingLogo"
            @click="$refs.logoInput.click()"
            class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ uploadingLogo ? 'Uploading...' : 'Upload Logo' }}
          </button>
          <button
            v-if="form.logo"
            type="button"
            @click="removeLogo"
            class="ml-3 bg-red-50 py-2 px-3 border border-red-300 rounded-md shadow-sm text-sm leading-4 font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Remove
          </button>
          <p class="mt-1 text-sm text-gray-500">PNG, JPG, SVG. Max 5MB. Drag & drop supported.</p>
          <div v-if="logoError" class="mt-1 text-sm text-red-600">
            {{ logoError }}
          </div>
        </div>
      </div>
    </div>

    <!-- Business Information -->
    <div>
      <h3 class="text-lg font-medium text-gray-900 mb-4">Business Information</h3>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="businessName" class="block text-sm font-medium text-gray-700">
            Business Name *
          </label>
          <input
            id="businessName"
            v-model="form.businessName"
            type="text"
            required
            :class="[
              'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
              errors.businessName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
            ]"
            @blur="validateField('businessName')"
            placeholder="Your Business Name"
          />
          <p v-if="errors.businessName" class="mt-1 text-sm text-red-600">
            {{ errors.businessName }}
          </p>
        </div>

        <div>
          <label for="businessType" class="block text-sm font-medium text-gray-700">
            Business Type *
          </label>
          <select
            id="businessType"
            v-model="form.businessType"
            :class="[
              'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
              errors.businessType ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
            ]"
            @blur="validateField('businessType')"
            required
          >
            <option value="">Select business type</option>
            <option value="sole-proprietorship">Sole Proprietorship</option>
            <option value="limited-liability">Limited Liability Company</option>
            <option value="partnership">Partnership</option>
            <option value="corporation">Corporation</option>
            <option value="nonprofit">Non-Profit Organization</option>
            <option value="government">Government Agency</option>
            <option value="enterprise">Enterprise</option>
          </select>
          <p v-if="errors.businessType" class="mt-1 text-sm text-red-600">
            {{ errors.businessType }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="rcNumber" class="block text-sm font-medium text-gray-700">
              Registration Number
            </label>
            <input
              id="rcNumber"
              v-model="form.rcNumber"
              type="text"
              placeholder="RC1234567 or 123456789"
              :class="[
                'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                errors.rcNumber ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              ]"
              @blur="validateField('rcNumber')"
            />
            <p class="mt-1 text-sm text-gray-500">Company registration or tax ID number</p>
            <p v-if="errors.rcNumber" class="mt-1 text-sm text-red-600">
              {{ errors.rcNumber }}
            </p>
          </div>

          <div>
            <label for="taxId" class="block text-sm font-medium text-gray-700">
              Tax ID (TIN/VAT)
            </label>
            <input
              id="taxId"
              v-model="form.taxId"
              type="text"
              placeholder="12345678-0001"
              :class="[
                'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                errors.taxId ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              ]"
              @blur="validateField('taxId')"
            />
            <p class="mt-1 text-sm text-gray-500">Tax identification number (optional)</p>
            <p v-if="errors.taxId" class="mt-1 text-sm text-red-600">
              {{ errors.taxId }}
            </p>
          </div>
        </div>

        <!-- Business Address -->
        <div class="space-y-4">
          <h4 class="text-sm font-medium text-gray-900">Business Address</h4>

          <div>
            <label for="address" class="block text-sm font-medium text-gray-700">
              Street Address *
            </label>
            <input
              id="address"
              v-model="form.address.street"
              type="text"
              required
              :class="[
                'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                errors['address.street'] ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              ]"
              @blur="validateField('address.street')"
              placeholder="123 Main Street, Suite 100"
            />
            <p v-if="errors['address.street']" class="mt-1 text-sm text-red-600">
              {{ errors['address.street'] }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="city" class="block text-sm font-medium text-gray-700">
                City *
              </label>
              <input
                id="city"
                v-model="form.address.city"
                type="text"
                required
                :class="[
                  'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                  errors['address.city'] ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                ]"
                @blur="validateField('address.city')"
                placeholder="New York"
              />
              <p v-if="errors['address.city']" class="mt-1 text-sm text-red-600">
                {{ errors['address.city'] }}
              </p>
            </div>

            <div>
              <label for="stateProvince" class="block text-sm font-medium text-gray-700">
                State / Province
              </label>
              <input
                id="stateProvince"
                v-model="form.address.stateProvince"
                type="text"
                :class="[
                  'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                  errors['address.stateProvince'] ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                ]"
                @blur="validateField('address.stateProvince')"
                placeholder="California"
              />
              <p class="mt-1 text-sm text-gray-500">State or province (optional)</p>
              <p v-if="errors['address.stateProvince']" class="mt-1 text-sm text-red-600">
                {{ errors['address.stateProvince'] }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="country" class="block text-sm font-medium text-gray-700">
                Country *
              </label>
              <select
                id="country"
                v-model="form.address.country"
                required
                :class="[
                  'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                  errors['address.country'] ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                ]"
                @blur="validateField('address.country')"
              >
                <option value="">Select country</option>
                <option value="US">🇺🇸 United States</option>
                <option value="CA">🇨🇦 Canada</option>
                <option value="GB">🇬🇧 United Kingdom</option>
                <option value="AU">🇦🇺 Australia</option>
                <option value="DE">🇩🇪 Germany</option>
                <option value="FR">🇫🇷 France</option>
                <option value="JP">🇯🇵 Japan</option>
                <option value="CN">🇨🇳 China</option>
                <option value="IN">🇮🇳 India</option>
                <option value="BR">🇧🇷 Brazil</option>
                <option value="MX">🇲🇽 Mexico</option>
                <option value="ES">🇪🇸 Spain</option>
                <option value="IT">🇮🇹 Italy</option>
                <option value="NL">🇳🇱 Netherlands</option>
                <option value="SE">🇸🇪 Sweden</option>
                <option value="NO">🇳🇴 Norway</option>
                <option value="DK">🇩🇰 Denmark</option>
                <option value="FI">🇫🇮 Finland</option>
                <option value="CH">🇨🇭 Switzerland</option>
                <option value="AT">🇦🇹 Austria</option>
                <option value="BE">🇧🇪 Belgium</option>
                <option value="IE">🇮🇪 Ireland</option>
                <option value="PT">🇵🇹 Portugal</option>
                <option value="GR">🇬🇷 Greece</option>
                <option value="TR">🇹🇷 Turkey</option>
                <option value="IL">🇮🇱 Israel</option>
                <option value="AE">🇦🇪 United Arab Emirates</option>
                <option value="SA">🇸🇦 Saudi Arabia</option>
                <option value="ZA">🇿🇦 South Africa</option>
                <option value="NG">🇳🇬 Nigeria</option>
                <option value="KE">🇰🇪 Kenya</option>
                <option value="EG">🇪🇬 Egypt</option>
                <option value="SG">🇸🇬 Singapore</option>
                <option value="MY">🇲🇾 Malaysia</option>
                <option value="TH">🇹🇭 Thailand</option>
                <option value="PH">🇵🇭 Philippines</option>
                <option value="ID">🇮🇩 Indonesia</option>
                <option value="KR">🇰🇷 South Korea</option>
                <option value="HK">🇭🇰 Hong Kong</option>
                <option value="TW">🇹🇼 Taiwan</option>
                <option value="NZ">🇳🇿 New Zealand</option>
                <option value="OTHER">🌍 Other</option>
              </select>
              <p v-if="errors['address.country']" class="mt-1 text-sm text-red-600">
                {{ errors['address.country'] }}
              </p>
            </div>

            <div>
              <label for="postalCode" class="block text-sm font-medium text-gray-700">
                Postal Code / ZIP Code
              </label>
              <input
                id="postalCode"
                v-model="form.address.postalCode"
                type="text"
                :class="[
                  'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                  errors['address.postalCode'] ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                ]"
                @blur="validateField('address.postalCode')"
                placeholder="10001"
              />
              <p class="mt-1 text-sm text-gray-500">Postal or ZIP code (optional)</p>
              <p v-if="errors['address.postalCode']" class="mt-1 text-sm text-red-600">
                {{ errors['address.postalCode'] }}
              </p>
            </div>
          </div>
        </div>

        <!-- Bank Details -->
        <div class="space-y-4 border-t pt-6">
          <h4 class="text-sm font-medium text-gray-900">Bank Details</h4>
          <p class="text-sm text-gray-500">For receiving payments (optional)</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="bankName" class="block text-sm font-medium text-gray-700">
                Bank Name
              </label>
              <select
                id="bankName"
                v-model="form.bankDetails.bankName"
                :class="[
                  'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                  errors['bankDetails.bankName'] ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                ]"
                @blur="validateField('bankDetails.bankName')"
              >
                <option value="">Select bank</option>
                <!-- International Banks -->
                <option value="wells-fargo">Wells Fargo</option>
                <option value="chase">Chase Bank</option>
                <option value="bank-of-america">Bank of America</option>
                <option value="citibank">Citibank</option>
                <option value="jpmorgan">JPMorgan Chase</option>
                <option value="goldman-sachs">Goldman Sachs</option>
                <option value="morgan-stanley">Morgan Stanley</option>
                <option value="hsbc">HSBC</option>
                <option value="barclays">Barclays</option>
                <option value="deutsche-bank">Deutsche Bank</option>
                <option value="credit-suisse">Credit Suisse</option>
                <option value="ubs">UBS</option>
                <option value="santander">Santander</option>
                <option value="bbva">BBVA</option>
                <option value="ing">ING Group</option>
                <option value="nordea">Nordea</option>
                <option value="danske-bank">Danske Bank</option>
                <option value="swedbank">Swedbank</option>
                <option value="kbc">KBC</option>
                <option value="bnpparibas">BNP Paribas</option>
                <option value="societe-generale">Société Générale</option>
                <option value="credit-agricole">Crédit Agricole</option>
                <option value="bnp">BNP</option>
                <!-- Asian Banks -->
                <option value="icbc">ICBC</option>
                <option value="china-construction-bank">China Construction Bank</option>
                <option value="agricultural-bank-of-china">Agricultural Bank of China</option>
                <option value="bank-of-china">Bank of China</option>
                <option value="industrial-and-commercial-bank-of-china">Industrial and Commercial Bank of China</option>
                <option value="bank-of-communications">Bank of Communications</option>
                <option value="china-merchants-bank">China Merchants Bank</option>
                <option value="shanghai-pudong-development-bank">Shanghai Pudong Development Bank</option>
                <option value="mitsubishi-ufj">Mitsubishi UFJ</option>
                <option value="mitsubishi-tokyo">Mitsubishi Tokyo</option>
                <option value="sumitomo-mitsui">Sumitomo Mitsui</option>
                <option value="mizuho">Mizuho</option>
                <option value="rakuten">Rakuten</option>
                <option value="resona">Resona</option>
                <option value="shinsei">Shinsei</option>
                <option value="smbc">SMBC</option>
                <option value="dbs">DBS</option>
                <option value="ocbc">OCBC</option>
                <option value="uob">UOB</option>
                <option value="maybank">Maybank</option>
                <option value="public-bank">Public Bank Berhad</option>
                <option value="cimb">CIMB</option>
                <option value="hong-leong">Hong Leong</option>
                <option value="rakyat">Rakyat</option>
                <option value="mandiri">Bank Mandiri</option>
                <option value="bni">BNI</option>
                <option value="bri">BRI</option>
                <option value="bca">BCA</option>
                <option value="danamon">Bank Danamon</option>
                <option value="permata">Bank Permata</option>
                <option value="commonwealth-bank-of-australia">Commonwealth Bank of Australia</option>
                <option value="anz">ANZ</option>
                <option value="nab">National Australia Bank</option>
                <option value="westpac">Westpac</option>
                <option value="macquarie">Macquarie</option>
                <option value="bendigo-and-adelaide">Bendigo and Adelaide</option>
                <option value="suncorp">Suncorp</option>
                <option value="national-bank-of-new-zealand">National Bank of New Zealand</option>
                <option value="anz-nz">ANZ New Zealand</option>
                <option value="westpac-nz">Westpac New Zealand</option>
                <option value="asb">ASB Bank</option>
                <option value="kookmin-bank">Kookmin Bank</option>
                <option value="shinhan-bank">Shinhan Bank</option>
                <option value="kb-kookmin">KB Kookmin Bank</option>
                <option value="woori-bank">Woori Bank</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="state-bank-of-india">State Bank of India</option>
                <option value="punjab-national-bank">Punjab National Bank</option>
                <option value="axis-bank">Axis Bank</option>
                <option value="kotak-mahindra">Kotak Mahindra Bank</option>
                <option value="hdfc-bank">HDFC Bank</option>
                <option value="itc">ITC</option>
                <option value="canara-bank">Canara Bank</option>
                <option value="bank-of-baroda">Bank of Baroda</option>
                <option value="union-bank-of-india">Union Bank of India</option>
                <option value="indian-bank">Indian Bank</option>
                <option value="central-bank-of-india">Central Bank of India</option>
                <option value="pnb">Punjab National Bank</option>
                <option value="idbi-bank">IDBI Bank</option>
                <option value="federal-bank">Federal Bank</option>
                <option value="corporation-bank">Corporation Bank</option>
                <option value="indian-overseas-bank">Indian Overseas Bank</option>
                <option value="ucob">UCO Bank</option>
                <!-- Nigerian Banks -->
                <option value="access-bank">Access Bank</option>
                <option value="zenith-bank">Zenith Bank</option>
                <option value="gtbank">Guaranty Trust Bank</option>
                <option value="first-bank">First Bank of Nigeria</option>
                <option value="united-bank-for-africa">United Bank for Africa</option>
                <option value="eco-bank">EcoBank</option>
                <option value="union-bank-of-nigeria">Union Bank of Nigeria</option>
                <option value="fidelity-bank">Fidelity Bank</option>
                <option value="sterling-bank">Sterling Bank</option>
                <option value="wema-bank">Wema Bank</option>
                <option value="heritage-bank">Heritage Bank</option>
                <option value="polaris-bank">Polaris Bank</option>
                <option value="keystone-bank">Keystone Bank</option>
                <option value="standard-chartered">Standard Chartered</option>
                <option value="citibank-nigeria">Citibank Nigeria</option>
                <option value="fcmb">First City Monument Bank</option>
                <option value="unity-bank">Unity Bank</option>
                <option value="stanbic-ibtc">Stanbic IBTC</option>
                <option value="jaiz-bank">Jaiz Bank</option>
                <option value="titan-trustbank">Titan TrustBank</option>
                <option value="providus-bank">Providus Bank</option>
                <option value="polaris-bank">Polaris Bank</option>
                <option value="signature-bank">Signature Bank</option>
                <option value="rand-merchant-bank">Rand Merchant Bank</option>
                <option value="absa">ABSA</option>
                <option value="nedbank">Nedbank</option>
                <option value="standard-bank">Standard Bank</option>
                <option value="first-national-bank">First National Bank</option>
                <option value="capitec-bank">Capitec Bank</option>
                <option value="investec">Investec</option>
                <option value="rmb-private-bank">RMB Private Bank</option>
                <option value="african-bank">African Bank</option>
                <option value="bidvest-bank">Bidvest Bank</option>
                <option value="albaraka">Al Baraka</option>
                <option value="adcb">ADCB</option>
                <option value="adib">ADIB</option>
                <option value="emirates-nbd">Emirates NBD</option>
                <option value="commercial-bank-of-dubai">Commercial Bank of Dubai</option>
                <option value="rajhi-bank">Al Rajhi Bank</option>
                <option value="al-hilal">Al Hilal Bank</option>
                <option value="masraf">Masraf</option>
                <option value="national-bank-of-egypt">National Bank of Egypt</option>
                <option value="cib">CIB</option>
                <option value="banque-misr">Banque Misr</option>
                <option value="banque-du-caire">Banque du Caire</option>
                <option value="qatar-national-bank">Qatar National Bank</option>
                <option value="doha-bank">Doha Bank</option>
                <option value="al-khaliji-commercial-bank">Al Khaliji Commercial Bank</option>
                <option value="commercial-bank-of-kuwait">Commercial Bank of Kuwait</option>
                <option value="national-bank-of-kuwait">National Bank of Kuwait</option>
                <option value="al-ahli-united-bank">Al Ahli United Bank</option>
                <option value="gulf-bank">Gulf Bank</option>
                <option value="kuwait-finance-house">Kuwait Finance House</option>
                <option value="bahrain-bahrain">Bahrain Bank</option>
                <option value="al-baraka">Al Baraka</option>
                <option value="bmw">BMCE</option>
                <option value="national-bank-of-bahrain">National Bank of Bahrain</option>
                <option value="al-salam">Al Salam</option>
                <option value="islamic-development-bank">Islamic Development Bank</option>
                <option value="riyad-bank">Riyad Bank</option>
                <option value="sabb">SABB</option>
                <option value="al-rajhi">Al Rajhi</option>
                <option value="al-inma">Al Inma</option>
                <option value="al-jazira">Al Jazira</option>
                <option value="banque-saoudienne">Banque Saudi</option>
                <option value="national-commercial-bank">National Commercial Bank</option>
                <option value="rajhi">Rajhi</option>
                <option value="alawwal">Alawwal</option>
                <option value="albilad">Al Bilad</option>
                <option value="alinma">Al Inma</option>
                <option value="bank-al-jazira">Bank Al Jazira</option>
                <option value="alrajhi">Al Rajhi</option>
                <option value="alahli">Ahli United Bank</option>
                <option value="other">Other</option>
              </select>
              <p v-if="errors['bankDetails.bankName']" class="mt-1 text-sm text-red-600">
                {{ errors['bankDetails.bankName'] }}
              </p>
            </div>

            <div>
              <label for="accountNumber" class="block text-sm font-medium text-gray-700">
                Account Number
              </label>
              <input
                id="accountNumber"
                v-model="form.bankDetails.accountNumber"
                type="text"
                placeholder="1234567890"
                :class="[
                  'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                  errors['bankDetails.accountNumber'] ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                ]"
                @blur="validateField('bankDetails.accountNumber')"
              />
              <p class="mt-1 text-sm text-gray-500">Bank account number (format varies by country)</p>
              <p v-if="errors['bankDetails.accountNumber']" class="mt-1 text-sm text-red-600">
                {{ errors['bankDetails.accountNumber'] }}
              </p>
            </div>
          </div>

          <div>
            <label for="accountName" class="block text-sm font-medium text-gray-700">
              Account Name
            </label>
            <input
              id="accountName"
              v-model="form.bankDetails.accountName"
              type="text"
              placeholder="Business Account Name"
              :class="[
                'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                errors['bankDetails.accountName'] ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              ]"
              @blur="validateField('bankDetails.accountName')"
            />
            <p class="mt-1 text-sm text-gray-500">Name as it appears on bank account</p>
            <p v-if="errors['bankDetails.accountName']" class="mt-1 text-sm text-red-600">
              {{ errors['bankDetails.accountName'] }}
            </p>
          </div>

          <div>
            <label for="swiftCode" class="block text-sm font-medium text-gray-700">
              SWIFT / BIC Code
            </label>
            <input
              id="swiftCode"
              v-model="form.bankDetails.swiftCode"
              type="text"
              placeholder="CHASUS33"
              :class="[
                'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                errors['bankDetails.swiftCode'] ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              ]"
              @blur="validateField('bankDetails.swiftCode')"
            />
            <p class="mt-1 text-sm text-gray-500">For international transfers (optional)</p>
            <p v-if="errors['bankDetails.swiftCode']" class="mt-1 text-sm text-red-600">
              {{ errors['bankDetails.swiftCode'] }}
            </p>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            @click="handleReset"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            :disabled="!isValidForm || isSaving"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <svg v-if="isSaving" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ isSaving ? 'Saving...' : 'Save Changes' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { BuildingOfficeIcon } from '@heroicons/vue/24/outline'
import { useAuth } from '~/composables/useAuth'

const { user } = useAuth()

const emit = defineEmits(['save', 'error'])

// State
const isSaving = ref(false)
const uploadingLogo = ref(false)
const logoError = ref('')
const originalForm = ref({})
const errors = ref({})

// Form data
const form = ref({
  logo: '',
  businessName: '',
  businessType: '',
  rcNumber: '',
  taxId: '',
  address: {
    street: '',
    city: '',
    stateProvince: '',
    country: '',
    postalCode: ''
  },
  bankDetails: {
    bankName: '',
    accountNumber: '',
    accountName: '',
    swiftCode: ''
  }
})

// Logo file input ref
const logoInput = ref(null)

// Computed
const isValidForm = computed(() => {
  return form.value.businessName &&
         form.value.businessType &&
         form.value.address.street &&
         form.value.address.city &&
         form.value.address.country &&
         Object.keys(errors.value).length === 0
})

const hasUnsavedChanges = computed(() => {
  return JSON.stringify(form.value) !== JSON.stringify(originalForm.value)
})

// Watch for form changes
watch(form, () => {
  // Clear errors when user starts typing
  Object.keys(errors.value).forEach(key => {
    if (form.value[key] && form.value[key].toString().trim()) {
      delete errors.value[key]
    }
  })
}, { deep: true })

// Initialize form with user data
onMounted(() => {
  if (user.value) {
    form.value = {
      logo: user.value.business?.logo || '',
      businessName: user.value.business?.name || '',
      businessType: user.value.business?.type || '',
      rcNumber: user.value.business?.rcNumber || '',
      taxId: user.value.business?.taxId || '',
      address: {
        street: user.value.business?.address?.street || '',
        city: user.value.business?.address?.city || '',
        stateProvince: user.value.business?.address?.state || '',
        country: user.value.business?.address?.country || '',
        postalCode: user.value.business?.address?.postalCode || ''
      },
      bankDetails: {
        bankName: user.value.business?.bankDetails?.bankName || '',
        accountNumber: user.value.business?.bankDetails?.accountNumber || '',
        accountName: user.value.business?.bankDetails?.accountName || '',
        swiftCode: user.value.business?.bankDetails?.swiftCode || ''
      }
    }
    // Store original form for reset functionality
    originalForm.value = JSON.parse(JSON.stringify(form.value))
  }
})

// Validation functions
const validateField = (field) => {
  const fieldValue = getNestedValue(form.value, field)

  switch (field) {
    case 'businessName':
      if (!fieldValue || !fieldValue.trim()) {
        errors.value[field] = 'Business name is required'
      } else if (fieldValue.length < 2) {
        errors.value[field] = 'Business name must be at least 2 characters'
      } else {
        delete errors.value[field]
      }
      break

    case 'businessType':
      if (!fieldValue) {
        errors.value[field] = 'Please select a business type'
      } else {
        delete errors.value[field]
      }
      break

    case 'rcNumber':
      if (fieldValue && !/^[A-Za-z0-9\-]{5,20}$/.test(fieldValue)) {
        errors.value[field] = 'Invalid registration number format'
      } else {
        delete errors.value[field]
      }
      break

    case 'taxId':
      if (fieldValue && !/^[A-Za-z0-9\-]{5,30}$/.test(fieldValue)) {
        errors.value[field] = 'Invalid tax ID format'
      } else {
        delete errors.value[field]
      }
      break

    case 'address.street':
      if (!fieldValue || !fieldValue.trim()) {
        errors.value[field] = 'Street address is required'
      } else if (fieldValue.length < 5) {
        errors.value[field] = 'Please enter a complete street address'
      } else {
        delete errors.value[field]
      }
      break

    case 'address.city':
      if (!fieldValue || !fieldValue.trim()) {
        errors.value[field] = 'City is required'
      } else {
        delete errors.value[field]
      }
      break

    case 'address.country':
      if (!fieldValue) {
        errors.value[field] = 'Country is required'
      } else {
        delete errors.value[field]
      }
      break

    case 'address.postalCode':
      if (fieldValue && !/^[A-Za-z0-9\s\-]{3,10}$/.test(fieldValue)) {
        errors.value[field] = 'Invalid postal code format'
      } else {
        delete errors.value[field]
      }
      break

    case 'bankDetails.bankName':
      if (fieldValue && !fieldValue) {
        errors.value[field] = 'Please select a bank'
      } else {
        delete errors.value[field]
      }
      break

    case 'bankDetails.accountNumber':
      if (fieldValue && !/^[A-Za-z0-9\-]{5,30}$/.test(fieldValue)) {
        errors.value[field] = 'Invalid account number format'
      } else {
        delete errors.value[field]
      }
      break

    case 'bankDetails.accountName':
      if (fieldValue && fieldValue.length < 3) {
        errors.value[field] = 'Account name must be at least 3 characters'
      } else {
        delete errors.value[field]
      }
      break

    case 'bankDetails.swiftCode':
      if (fieldValue && !/^[A-Za-z0-9]{8,11}$/.test(fieldValue)) {
        errors.value[field] = 'SWIFT code must be 8 or 11 characters'
      } else {
        delete errors.value[field]
      }
      break
  }
}

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

// Logo handling
const handleLogoChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validate file
  if (!file.type.startsWith('image/')) {
    logoError.value = 'Please select an image file'
    return
  }

  if (file.size > 5 * 1024 * 1024) { // 5MB
    logoError.value = 'Image size must be less than 5MB'
    return
  }

  try {
    uploadingLogo.value = true
    logoError.value = ''

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      form.value.logo = e.target.result
    }
    reader.readAsDataURL(file)

    // Here you would upload to server
    // const uploadedUrl = await uploadLogo(file)
    // form.value.logo = uploadedUrl

  } catch (error) {
    logoError.value = 'Failed to upload logo'
    console.error('Logo upload error:', error)
  } finally {
    uploadingLogo.value = false
  }
}

const removeLogo = () => {
  form.value.logo = ''
  if (logoInput.value) {
    logoInput.value.value = ''
  }
}

// Form submission
const handleSubmit = async () => {
  // Validate all required fields
  const requiredFields = [
    'businessName',
    'businessType',
    'address.street',
    'address.city',
    'address.country'
  ]

  for (const field of requiredFields) {
    validateField(field)
    if (errors.value[field]) {
      return // Stop if there are validation errors
    }
  }

  try {
    isSaving.value = true
    emit('save', {
      type: 'business',
      payload: {
        business: {
          logo: form.value.logo,
          name: form.value.businessName,
          type: form.value.businessType,
          rcNumber: form.value.rcNumber,
          taxId: form.value.taxId,
          address: {
            street: form.value.address.street,
            city: form.value.address.city,
            state: form.value.address.stateProvince,
            country: form.value.address.country,
            postalCode: form.value.address.postalCode
          },
          bankDetails: {
            bankName: form.value.bankDetails.bankName,
            accountNumber: form.value.bankDetails.accountNumber,
            accountName: form.value.bankDetails.accountName,
            swiftCode: form.value.bankDetails.swiftCode
          }
        }
      }
    })

    // Update original form after successful save
    originalForm.value = JSON.parse(JSON.stringify(form.value))
  } catch (error) {
    emit('error', error)
  } finally {
    isSaving.value = false
  }
}

// Reset form
const handleReset = () => {
  form.value = JSON.parse(JSON.stringify(originalForm.value))
  errors.value = {}
  logoError.value = ''
}
</script>