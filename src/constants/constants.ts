export const apiConstants = {
  rootApi: 'https://blog.kata.academy/api/',
  getArticles: 'articles?',
  getArticleBySlug: 'articles/',
  limit: 'limit=5',
  offset: '&offset=',
  signUp: 'users',
  signIn: 'users/login',
  login: 'user',
  token: 'token',
  postNewArticle: 'articles',
  favorite: '/favorite',
}

export const linkConstants = {
  root: '/',
  signIn: '/signSlice-in',
  signUp: '/signSlice-up',
  profile: '/profile',
  articleBySlug: 'articles/:slug',
  newArticle: '/new-article',
  articleEdit: '/articles/:slug/edit',
  articles: '/articles',
}

export const validation = {
  email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  password: /^\S+$/,
  emailRejectMessage: 'please check your email',
  usernameMinLength: 'Your username must be at least 4 characters long',
  usernameMaxLength: 'Your username must be less then 20 characters long',
  passwordMinLength: 'Your password must be at least 6 characters long.',
  passwordMaxLength: 'Your password must be less than 40 characters long',
  passwordNoWhiteSpaceMesage: 'Your password should not have any whitespace characters',
  mismatchPassword: 'Passwords must match',
  emptyField: 'Please fill this field',
  agreementMessage: 'please click the user agreement',
}

export const toastConstants = {
  params: {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  },
  editingSuccessMessage: 'Your user changes successfully',
  defaultErrMessage: 'Something goes wrong. Please try again later',
  successSignUp: 'You have created a Realworld blog account. Happy blogging!',
  successSignIn: 'Welcome back!',
  successUpdate: 'Your data has been successfully updated!',
  successCreateArticle: 'Your article has been published!',
  successEditArticle: 'Your article has been successfully edited!',
}
