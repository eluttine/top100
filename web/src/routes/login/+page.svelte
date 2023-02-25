<div class="flex flex-col items-center h-full w-full">
  <h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-based-content">
    Kirjaudu sisään
  </h2>
  <p class="text-center mt-1">
    Tai <a href="/register" class="text-primary font-medium hover:cursor-pointer hover:underline"
      >rekisteröidy</a
    > jos sinulla ei ole vielä tiliä.
  </p>
  <form action="?/login" method="POST" class="flex flex-col items-center space-y-2 w-full pt-4">
    <div class="form-control w-full max-w-md">
      <label for="email" class="label font-medium pb-1">
        <span class="label-text">Sähköposti</span>
      </label>
      <input type="email" name="email" class="input input-bordered w-full max-w-md" />
    </div>
    <div class="form-control w-full max-w-md">
      <label for="password" class="label font-medium pb-1">
        <span class="label-text">Salasana</span>
      </label>
      <input type="password" name="password" class="input input-bordered w-full max-w-md" />
    </div>
    <div class="w-full max-w-md pt-2">
      <button type="submit" class="btn btn-primary w-full">Kirjaudu</button>
    </div>
  </form>
</div>
