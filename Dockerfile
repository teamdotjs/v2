FROM ruby:2.2.5

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
ENV SECRET_KEY_BASE_DEV=testing

CMD bash
