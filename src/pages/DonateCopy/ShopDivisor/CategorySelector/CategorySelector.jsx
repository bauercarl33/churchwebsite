import "./CategorySelector.css";

const CategorySelector = () => {
  return (
    <>
      <div class="section-with-margin section-with-padding section-four">
        <ul class="tab-list" role="navigation">
          <li
            role="menuitem"
            class="tab-item tab-link"
            data-career=""
            data-current="true"
          >
            All
          </li>
          <li
            role="menuitem"
            class="tab-item tab-link"
            data-career="Customer Support"
          >
            Iconography
          </li>
          <li role="menuitem" class="tab-item tab-link" data-career="Design">
            Iconostasis
          </li>
          <li role="menuitem" class="tab-item tab-link" data-career="Security">
            Fixtures
          </li>
          <li role="menuitem" class="tab-item tab-link" data-career="Tech">
            Main Hall
          </li>
          <li role="menuitem" class="tab-item tab-link" data-career="Bussines">
            Outside Fixtures
          </li>
        </ul>

        <ul class="career-list" id="jobListing"></ul>
      </div>
    </>
  );
};

export default CategorySelector;
